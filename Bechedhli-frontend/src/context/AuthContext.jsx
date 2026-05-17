import { createContext, useState, useCallback, useEffect, useContext } from 'react';
import { api } from '../api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('bechedhli_token');
    if (!token) { setLoading(false); return; }
    api.get('/me')
      .then(setUser)
      .catch(() => { localStorage.removeItem('bechedhli_token'); })
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (email, password) => {
    const data = await api.post('/login', { email, password });
    localStorage.setItem('bechedhli_token', data.token);
    setUser(data.user);
    return { success: true };
  }, []);

  const signup = useCallback(async (name, email, password) => {
    const data = await api.post('/register', { name, email, password });
    localStorage.setItem('bechedhli_token', data.token);
    setUser(data.user);
    return { success: true };
  }, []);

  const logout = useCallback(async () => {
    try {
      const token = localStorage.getItem('bechedhli_token');
      if (token) await api.post('/logout');
    } catch {}
    localStorage.removeItem('bechedhli_token');
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
