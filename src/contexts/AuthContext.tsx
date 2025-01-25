"use client";

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

type User = {
  email: string;
  product: string;
} | null;

type AuthContextType = {
  user: User;
  login: (user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User>(null);

  // Recuperar usuário armazenado no localStorage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("currentUser");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Erro ao carregar usuário do localStorage:", error);
    }
  }, []);

  // Função para login
  const login = (userData: User) => {
    if (!userData) {
      console.error("Dados do usuário inválidos para login");
      return;
    }
    setUser(userData);
    try {
      localStorage.setItem("currentUser", JSON.stringify(userData));
    } catch (error) {
      console.error("Erro ao salvar usuário no localStorage:", error);
    }
  };

  // Função para logout
  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem("currentUser");
    } catch (error) {
      console.error("Erro ao remover usuário do localStorage:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
