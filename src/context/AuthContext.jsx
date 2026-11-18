"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  isAdmin: false,
  login: () => {},
  register: () => {},
  logout: () => {},
});

const DEFAULT_USERS = {
  admin: {
    id: "ADM-001",
    name: "Master Chef & Admin",
    email: "admin@reshto.com",
    role: "admin",
    avatar:
      "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=400&q=80",
  },
  user: {
    id: "USR-101",
    name: "Tahmid Hassan",
    email: "tahmid@example.com",
    phone: "+880 1711-234567",
    role: "user",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    membership: "Gold VIP Foodie",
    points: 480,
  },
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("reshto-user");
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      // fallback
    }
    setMounted(true);
  }, []);

  const login = ({ email, password, role }) => {
    const isExplicitAdmin =
      role === "admin" ||
      (email && email.toLowerCase().includes("admin")) ||
      password === "admin123";

    const sessionUser = isExplicitAdmin
      ? {
          ...DEFAULT_USERS.admin,
          email: email || DEFAULT_USERS.admin.email,
        }
      : {
          ...DEFAULT_USERS.user,
          email: email || DEFAULT_USERS.user.email,
          name: email ? email.split("@")[0] : DEFAULT_USERS.user.name,
        };

    setUser(sessionUser);
    try {
      localStorage.setItem("reshto-user", JSON.stringify(sessionUser));
    } catch {
      // ignore
    }

    return sessionUser;
  };

  const register = ({ name, email, phone }) => {
    const newUser = {
      id: `USR-${Math.floor(100 + Math.random() * 900)}`,
      name: name || "New Foodie",
      email: email || "customer@example.com",
      phone: phone || "+880 1700-000000",
      role: "user",
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80",
      membership: "Silver Member",
      points: 50,
    };

    setUser(newUser);
    try {
      localStorage.setItem("reshto-user", JSON.stringify(newUser));
    } catch {
      // ignore
    }

    return newUser;
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem("reshto-user");
    } catch {
      // ignore
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
        login,
        register,
        logout,
        mounted,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
