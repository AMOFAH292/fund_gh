// AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Retrieve token and user from localStorage on initialization
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const signUp = async ({ name, email, password }) => {
    try {
      const response = await fetch(
        "https://ghanafund-server.onrender.com/api/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: name,
            lastName: "",
            email,
            password,
            phoneNumber: "0000000000",
            address: "unknown",
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to sign up");
      }

      const data = await response.json();
      const { token, user } = data;

      // Save token and user in state and localStorage
      setToken(token);
      setUser(user);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Sign up successful!");
      return { success: true, token, user };
    } catch (err) {
      toast.error(err.message);
      return { success: false, error: err.message };
    }
  };

  const login = async ({ email, password }) => {
    try {
      const response = await fetch(
        "https://ghanafund-server.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to log in");
      }

      const data = await response.json();
      const { token, user } = data;

      // Save token and user in state and localStorage
      setToken(token);
      setUser(user);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Login successful!");
      return { success: true, token, user };
    } catch (err) {
      toast.error(err.message);
      return { success: false, error: err.message };
    }
  };

  // Logout: remove token and user from both state and localStorage
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out");
  };

  return (
    <AuthContext.Provider value={{ signUp, login, logout, token, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
