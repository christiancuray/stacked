export interface User {
  username: string;
  token: string;
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}
