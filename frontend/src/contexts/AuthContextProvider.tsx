import React, { useState } from "react";
import type { ReactNode } from "react";
import axios from "axios";
import type { User, AuthContextType } from "../types/auth";
import { AuthContext } from "./AuthContext";

// Add request interceptor to ensure Authorization header is set
axios.interceptors.request.use(
  (config) => {
    // Allow login and register endpoints
    if (
      config.url?.includes("/auth/login") ||
      config.url?.includes("/auth/register")
    ) {
      return config;
    }

    // For other requests, ensure Authorization header is set
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser.token) {
          config.headers.Authorization = `Bearer ${parsedUser.token}`;
        }
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("user");
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

interface AuthProviderProps {
  children: ReactNode;
}

// Initialize user state synchronously
const initializeAuth = (): User | null => {
  try {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);

      // Set default Authorization header for axios
      if (parsedUser.token) {
        axios.defaults.headers.common["Authorization"] =
          `Bearer ${parsedUser.token}`;
      }

      return parsedUser;
    }
  } catch (error) {
    console.error("Error parsing stored user:", error);
    localStorage.removeItem("user");
  }
  return null;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => initializeAuth());

  const login = (username: string, token: string) => {
    const userData = { username, token };
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));

    // Set default Authorization header for axios
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
  };

  const isAuthenticated = !!user;

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
