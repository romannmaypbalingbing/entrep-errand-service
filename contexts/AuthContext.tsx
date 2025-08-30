import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Customer, Runner } from '@/types';
import { mockCustomers, mockRunners } from '@/data/mockData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  userRole: 'customer' | 'runner' | null;
  login: (email: string, password: string, role: 'customer' | 'runner') => Promise<boolean>;
  register: (userData: Partial<User>, role: 'customer' | 'runner') => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for existing session
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const login = async (email: string, password: string, role: 'customer' | 'runner'): Promise<boolean> => {
    setIsLoading(true);
    
    // Mock authentication delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find user in mock data
    const allUsers = role === 'customer' ? mockCustomers : mockRunners;
    const foundUser = allUsers.find(u => u.email === email);
    
    if (foundUser) {
      setUser(foundUser);
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const register = async (userData: Partial<User>, role: 'customer' | 'runner'): Promise<boolean> => {
    setIsLoading(true);
    
    // Mock registration delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newUser: User = {
      id: `${role}-${Date.now()}`,
      email: userData.email || '',
      phone: userData.phone || '',
      name: userData.name || '',
      role,
      verified: false,
      rating: 0,
      totalRatings: 0,
      createdAt: new Date().toISOString(),
      ...(role === 'customer' ? { paymentMethods: [] } : {
        vehicle: 'Motorcycle',
        availability: true,
        earnings: 0,
        completedJobs: 0
      })
    };
    
    setUser(newUser);
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData });
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      userRole: user?.role || null,
      login,
      register,
      logout,
      updateUser,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}