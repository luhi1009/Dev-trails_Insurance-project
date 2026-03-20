'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User } from '@/app/types';

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string, phone: string, vehicleType: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setIsLoggedIn(true);
      } catch (e) {
        console.error('Failed to parse saved user');
      }
    }
  }, []);

  const login = (email: string, password: string) => {
    // Simple frontend validation - in production, this would call a backend
    if (email && password) {
      const newUser: User = {
        id: 'user_' + Date.now(),
        name: email.split('@')[0],
        email,
        phone: '9876543210',
        vehicleType: 'bike',
      };
      setUser(newUser);
      setIsLoggedIn(true);
      localStorage.setItem('user', JSON.stringify(newUser));
      localStorage.setItem('password', btoa(password)); // Simple encoding, not secure
      return true;
    }
    return false;
  };

  const signup = (name: string, email: string, password: string, phone: string, vehicleType: string) => {
    if (name && email && password && phone && vehicleType) {
      const newUser: User = {
        id: 'user_' + Date.now(),
        name,
        email,
        phone,
        vehicleType,
      };
      setUser(newUser);
      setIsLoggedIn(true);
      localStorage.setItem('user', JSON.stringify(newUser));
      localStorage.setItem('password', btoa(password)); // Simple encoding, not secure
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('user');
    localStorage.removeItem('password');
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
