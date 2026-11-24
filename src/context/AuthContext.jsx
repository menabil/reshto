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

const DEMO_SESSION_VERSION = "frontend-demo-v1";
const DEMO_ACCOUNTS = [
  {
    loginId: "12345",
    password: "12345",
    user: {
      id: "ADM-001",
      name: "Reshto Admin",
      email: "admin@reshto.local",
      phone: "+880 1700-000001",
      role: "admin",
      avatar:
        "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=400&q=80",
    },
  },
  {
    loginId: "1234",
    password: "1234",
    user: {
      id: "USR-101",
      name: "Reshto Customer",
      email: "customer@reshto.local",
      phone: "+880 1700-000002",
      role: "user",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      membership: "Gold VIP Foodie",
      points: 480,
    },
  },
];

const isDemoAuthEnabled = process.env.NODE_ENV === "development";

const persistDemoSession = (sessionUser) => {
  try {
    localStorage.setItem(
      "reshto-user",
      JSON.stringify({ ...sessionUser, authMode: DEMO_SESSION_VERSION }),
    );
  } catch {
    // Keep the in-memory session available if browser storage is disabled.
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    try {
      const stored = localStorage.getItem("reshto-user");
      if (stored) {
        const savedSession = JSON.parse(stored);
        if (
          isDemoAuthEnabled &&
          savedSession.authMode === DEMO_SESSION_VERSION
        ) {
          const { authMode, ...savedUser } = savedSession;
          const accountDefaults = DEMO_ACCOUNTS.find(
            (account) => account.user.id === savedUser.id,
          )?.user;
          setUser({
            ...accountDefaults,
            ...savedUser,
            phone: savedUser.phone || accountDefaults?.phone,
          });
        } else {
          localStorage.removeItem("reshto-user");
        }
      }
    } catch {
      // Ignore malformed stored sessions; no authenticated state is restored.
    }
    setMounted(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const login = ({ id, password }) => {
    if (!isDemoAuthEnabled) return null;

    const account = DEMO_ACCOUNTS.find(
      (candidate) => candidate.loginId === id && candidate.password === password,
    );
    if (!account) return null;

    const sessionUser = { ...account.user };

    setUser(sessionUser);
    persistDemoSession(sessionUser);
    return sessionUser;
  };

  const register = ({ name, email, phone }) => {
    if (!isDemoAuthEnabled) return null;

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
    persistDemoSession(newUser);
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
