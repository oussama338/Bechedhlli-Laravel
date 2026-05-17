import React, { createContext, useState, useCallback, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('bechedhli_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      } catch (err) {
        console.error('Error parsing stored user:', err);
        localStorage.removeItem('bechedhli_user');
      }
    }
    setLoading(false);
  }, []);

  const login = useCallback((email, password) => {
    // Valid credentials
    const VALID_USERS = [
      { 
        email: 'admin@bechedhli.dz', 
        password: 'admin123', 
        name: 'Admin Directeur', 
        role: 'Directeur Commercial',
        id: 1
      },
      { 
        email: 'employe@bechedhli.dz', 
        password: 'employe123', 
        name: 'Employé Test', 
        role: 'Employé',
        id: 2
      },
    ];

    const foundUser = VALID_USERS.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const userData = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        role: foundUser.role,
        loginTime: new Date().toISOString(),
      };
      
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('bechedhli_user', JSON.stringify(userData));
      return { success: true };
    }
    
    return { success: false, error: 'Email ou mot de passe incorrect' };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('bechedhli_user');
  }, []);

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
