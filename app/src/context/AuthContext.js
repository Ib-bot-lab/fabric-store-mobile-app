// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from "react";

import {
  login,
  getCurrentUser,
  signUp,
  logout,
} from "./../backend/authService";
import { useNavigation } from "@react-navigation/native";
import { account } from "../backend/appwriteConfig";
import { getUserFromStorage, saveUserToStorage } from "../utils/storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isAdmin, setIsAdmin] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const init = async () => {
      // Check local storage FIRST (offline support)
      // Otherwise try Appwrite (online)
      const storedUser = await getUserFromStorage();

      if (storedUser) {
        setUser(storedUser);
        setLoading(false);
        return;
      } else {
        const current = await getCurrentUser();
        if (current) {
          setUser(current);
          saveUserToStorage(current); // store for offline use
        }
      }

      setLoading(false);
    };

    init();
  }, []);

  /////////////////////////////////////////////////////////////////
  const login = async (email, password) => {
    // Hardcoded admin credentials
    if (email === "admin" && password === "admin") {
      setUser({ email, isAdmin: true });
      setIsAdmin(true);

      return { success: true, isAdmin: true };
    }
    try {
      await login(email, password);
      const user = await account.get();
      setUser(user);
    } catch (err) {
      alert(err.message);
    }
    // Normal user login logic
    setUser({ email, isAdmin: false });
    setIsAdmin(false);
    return { success: true, isAdmin: false };
  };

  ////////////////////////////////////////////////////////////
  const signup = async (email, password, name) => {
    try {
      // Create account
      await signUp(email, password, name, bio);

      // Auto login after signup
      await login(email, password);

      // Get user info & update context
      const user = await account.get();
      setUser(user);
    } catch (err) {
      alert(err.message);
    }
    // Normal user login logic
    setUser({ email, isAdmin: false });
    setIsAdmin(false);
    return { success: true, isAdmin: false };
  };

  //////////////////////////////////////////////////////
  const logout = async () => {
    setUser(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAdmin,
        setIsAdmin,
        login,
        signup,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
