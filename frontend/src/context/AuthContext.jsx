import { createContext, useState, useEffect } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

// Default demo user for testing across different ports
const DEFAULT_USERS = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@hrms.com",
    password: "admin123"
  },
  {
    id: 2,
    name: "Test User",
    email: "test@hrms.com",
    password: "test123"
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize user from localStorage on mount
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedUser = localStorage.getItem("user");
        const storedTimestamp = localStorage.getItem("authTimestamp");
        
        if (storedUser && storedTimestamp) {
          const user = JSON.parse(storedUser);
          // Session valid for 24 hours
          const authTime = parseInt(storedTimestamp);
          const now = Date.now();
          const sessionValidTime = 24 * 60 * 60 * 1000; // 24 hours in ms
          
          if (now - authTime < sessionValidTime) {
            setUser(user);
          } else {
            // Session expired, clear storage
            localStorage.removeItem("user");
            localStorage.removeItem("authTimestamp");
          }
        }

        // Initialize default users if not present
        const users = JSON.parse(localStorage.getItem("users") || "[]");
        if (users.length === 0) {
          localStorage.setItem("users", JSON.stringify(DEFAULT_USERS));
        }
      } catch (error) {
        console.error("Error reading from localStorage:", error);
        localStorage.removeItem("user");
        localStorage.removeItem("authTimestamp");
        // Ensure default users are set
        localStorage.setItem("users", JSON.stringify(DEFAULT_USERS));
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    try {
      // Get users from localStorage, fallback to default users
      let users = JSON.parse(localStorage.getItem("users") || "[]");
      if (users.length === 0) {
        users = DEFAULT_USERS;
        localStorage.setItem("users", JSON.stringify(DEFAULT_USERS));
      }

      const registeredUser = users.find(u => u.email === email && u.password === password);
      
      if (registeredUser) {
        const loggedInUser = { 
          id: registeredUser.id, 
          name: registeredUser.name, 
          email: registeredUser.email 
        };
        
        // Store both user data and timestamp
        localStorage.setItem("user", JSON.stringify(loggedInUser));
        localStorage.setItem("authTimestamp", Date.now().toString());
        localStorage.setItem("authToken", `token_${registeredUser.id}_${Date.now()}`);
        
        setUser(loggedInUser);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("authTimestamp");
      localStorage.removeItem("authToken");
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};