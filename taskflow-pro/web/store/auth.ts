// store/auth.ts
import { create } from "zustand";

type AuthState = {
  user: any;
  token: string | null;
  isLoading: boolean;
  hasCheckedAuth: boolean;
  login: (user: any, token: string) => void;
  logout: () => void;
  setLoading: (val: boolean) => void;
  setCheckedAuth: (val: boolean) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: true,
  hasCheckedAuth: false,
  login: (user, token) =>
    set({ user, token, isLoading: false, hasCheckedAuth: true }),
  logout: () =>
    set({ user: null, token: null, isLoading: false, hasCheckedAuth: true }),
  setLoading: (val) => set({ isLoading: val }),
  setCheckedAuth: (val) => set({ hasCheckedAuth: val }),
}));
