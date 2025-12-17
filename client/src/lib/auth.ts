import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => Promise<boolean>;
}

export const useAuth = create<AuthState>((set) => ({
  isAuthenticated: false,
  login: async (username: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        set({ isAuthenticated: true });
        return true;
      }
      return false;
    } catch {
      return false;
    }
  },
  logout: async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    set({ isAuthenticated: false });
  },
  checkAuth: async () => {
    try {
      const response = await fetch('/api/auth/check');
      const isAuth = response.ok;
      set({ isAuthenticated: isAuth });
      return isAuth;
    } catch {
      set({ isAuthenticated: false });
      return false;
    }
  },
}));
