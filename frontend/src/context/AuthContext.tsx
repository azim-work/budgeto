import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { securePing } from "@/lib/api";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

type AuthContextType = {
  isAuthenticated: boolean;
  loading: boolean;
  checkAuth: () => Promise<void>;
  login: (password: string) => Promise<boolean>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = async () => {
    try {
      await securePing();
      setIsAuthenticated(true);
    } catch {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (password: string) => {
    try {
      await axios.post(
        `${API_BASE}/auth/login`,
        { password },
        { withCredentials: true }
      );
      await checkAuth(); // recheck auth
      return true;
    } catch {
      return false;
    }
  };

  const logout = async () => {
    await axios.post(`${API_BASE}/auth/logout`, {}, { withCredentials: true });
    setIsAuthenticated(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, loading, checkAuth, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
