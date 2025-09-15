import { createContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from './auth.types';

function normalizeUser(u: unknown): User {
  const obj = u as any;
  if (!obj) {
    throw new Error('normalizeUser: user is empty');
  }

  const rawId = obj.id ;
  if (!rawId) {
    throw new Error('normalizeUser: missing id on user');
  }  
  const id: string = typeof rawId === 'string' ? rawId : rawId?.toString?.();

  if (!id) {
    throw new Error('normalizeUser: missing id/_id on user');
  }


  const role = obj.role as 'patient' | 'doctor';
  if (role !== 'patient' && role !== 'doctor') {
    throw new Error('normalizeUser: invalid role');
  }

  return {
    id,
    email: String(obj.email ?? ''),
    role,
    isVerified: !!obj.isVerified,
    firstName: obj.firstName ?? undefined,
    lastName: obj.lastName ?? undefined,
  };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        const normalized = normalizeUser(parsed);
        setToken(storedToken);
        setUser(normalized);

        localStorage.setItem('user', JSON.stringify(normalized));
      } catch {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = (userData: User | any, tokenData: string) => {
    const normalized = normalizeUser(userData);
    setUser(normalized);
    setToken(tokenData);
    localStorage.setItem('token', tokenData);
    localStorage.setItem('user', JSON.stringify(normalized));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider };
export default AuthContext;
