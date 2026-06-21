"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { api } from "../services/api";

type User = {
  id: string;
  email: string;
  name: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  signIn: (token: string, user: User) => void;
  signOut: () => void;
};

const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const isAuthenticated = !!user;

  useEffect(() => {
    const token = localStorage.getItem("forgecv.token");
    const storedUser = localStorage.getItem("forgecv.user");

    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  function signIn(token: string, userData: User) {
    localStorage.setItem("forgecv.token", token);
    localStorage.setItem("forgecv.user", JSON.stringify(userData));
    setUser(userData);
    router.push("/dashboard");
  }

  function signOut() {
    localStorage.removeItem("forgecv.token");
    localStorage.removeItem("forgecv.user");
    setUser(null);
    router.push("/login");
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
