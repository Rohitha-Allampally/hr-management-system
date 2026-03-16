import { createContext, useState, useEffect } from "react";
import API from "../services/api";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

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
            localStorage.removeItem("authToken");
          }
        }
      } catch (error) {
        console.error("Error reading from localStorage:", error);
        localStorage.removeItem("user");
        localStorage.removeItem("authTimestamp");
        localStorage.removeItem("authToken");
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const register = async (name, email, password) => {
    try {
      const response = await API.post("/auth/register", {
        name,
        email,
        password
      });
      return { success: true, user: response.data };
    } catch (error) {
      console.error("Registration error:", error);
      return { success: false, error: error.response?.data?.message || "Registration failed" };
    }
  };

  const login = async (email, password) => {
    try {
      const response = await API.post("/auth/login", {
        email,
        password
      });

      if (response.status === 200) {
        const loggedInUser = {
          id: response.data.id,
          name: response.data.name,
          email: response.data.email
        };

        // Store user data and timestamp
        localStorage.setItem("user", JSON.stringify(loggedInUser));
        localStorage.setItem("authTimestamp", Date.now().toString());
        localStorage.setItem("authToken", `token_${response.data.id}_${Date.now()}`);

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
    <AuthContext.Provider value={{ user, login, logout, register, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};