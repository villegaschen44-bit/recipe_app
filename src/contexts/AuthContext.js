import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = useCallback((email, password) => {
    const newUser = {
      id: Date.now().toString(),
      email,
      name: email.split('@')[0],
    };
    setUser(newUser);
    return true;
  }, []);

  const register = useCallback((name, email, password) => {
    const newUser = {
      id: Date.now().toString(),
      email,
      name,
    };
    setUser(newUser);
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
