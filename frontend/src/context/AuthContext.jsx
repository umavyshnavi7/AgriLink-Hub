import { createContext, useContext, useState } from 'react';
import { AuthService } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => ({
    isLoggedIn: AuthService.isLoggedIn(),
    role: AuthService.getRole(),
    name: AuthService.getName(),
    email: AuthService.getEmail()
  }));

  const login = (data) => {
    AuthService.setSession(data);
    setUser({ isLoggedIn: true, role: data.role, name: data.name, email: data.email });
  };

  const logout = () => {
    AuthService.logout();
    setUser({ isLoggedIn: false, role: null, name: null, email: null });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
