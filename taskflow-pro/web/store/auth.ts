import { create } from "zustand";

interface User {
  id: string;
  email: string;
  // Tambahkan field sesuai user kamu
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: true,
  login: (user, token) => set({ user, token, isLoading: false }),
  logout: () => set({ user: null, token: null, isLoading: false }),
  setLoading: (loading) => set({ isLoading: loading }),
}));
