"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  clearFrontendSession,
  loginFrontendAccount,
  registerFrontendAccount,
  restoreFrontendSession,
  updateFrontendProfile,
} from "@/lib/frontendAuth";

const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  isAdmin: false,
  login: async () => ({ success: false, error: "Authentication unavailable." }),
  register: async () => ({ success: false, error: "Registration unavailable." }),
  updateProfile: () => ({ success: false, error: "Profile updates unavailable." }),
  logout: () => {},
  mounted: false,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    try {
      setUser(restoreFrontendSession());
    } catch {
      try {
        clearFrontendSession();
      } catch {
        // Storage can be unavailable in private or restricted browser contexts.
      }
    } finally {
      setMounted(true);
    }

    const handleStorage = (event) => {
      if (event.key !== "reshto-user") return;
      try {
        setUser(restoreFrontendSession());
      } catch {
        setUser(null);
      }
    };

    window.addEventListener("storage", handleStorage);
    /* eslint-enable react-hooks/set-state-in-effect */
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const login = async (credentials) => {
    const result = await loginFrontendAccount(credentials);
    if (result.success) {
      setUser(result.user);
    }
    return result;
  };

  const register = async (accountDetails) => {
    const result = await registerFrontendAccount(accountDetails);
    if (result.success) {
      setUser(result.user);
    }
    return result;
  };

  const updateProfile = (profile) => {
    if (!user) {
      return { success: false, error: "Sign in to update your profile." };
    }

    const result = updateFrontendProfile({ ...profile, userId: user.id });
    if (result.success) {
      setUser(result.user);
    }
    return result;
  };

  const logout = () => {
    setUser(null);
    try {
      clearFrontendSession();
    } catch {
      // The in-memory session is still cleared if browser storage is unavailable.
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isAdmin: user?.role === "admin",
        login,
        register,
        updateProfile,
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
