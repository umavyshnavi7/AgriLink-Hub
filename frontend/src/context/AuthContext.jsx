import { createContext, useContext, useState } from 'react';
import { AuthService } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => ({
    isLoggedIn: !!sessionStorage.getItem('isLoggedIn'),
    role: sessionStorage.getItem('userRole'),
    name: sessionStorage.getItem('userName'),
    email: sessionStorage.getItem('userEmail'),
  }));

  const login = (data) => {
    AuthService.setSession(data);
    setUser({ isLoggedIn: true, role: data.role, name: data.name, email: data.email });
  };

  const logout = () => {
    sessionStorage.clear();
    setUser({ isLoggedIn: false, role: null, name: null, email: null });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
