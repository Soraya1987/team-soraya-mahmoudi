export interface User {
  id: string;
  name?: string;
  email: string;
  role: 'patient' | 'doctor';
  isVerified: boolean;
  firstName?: string;
  lastName?: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  loading: boolean;
}
