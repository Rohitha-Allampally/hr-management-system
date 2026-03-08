import { createContext, useState, useEffect } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email, password) => {
    // Verify against registered users in localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const registeredUser = users.find(u => u.email === email && u.password === password);
    
    if (registeredUser) {
      const loggedInUser = { id: registeredUser.id, name: registeredUser.name, email: registeredUser.email };
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      setUser(loggedInUser);
      return true;
    }
    
    return false;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};