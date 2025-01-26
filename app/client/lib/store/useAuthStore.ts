"use client";
import { create } from "zustand";

interface AuthState {
  loggedInUser: { [key: string]: any } | null;
  token: string | null;
  setUser: (user: { [key: string]: any }) => void;
  setToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  loggedInUser: null,
  token: null,
  setUser: (user) => set({ loggedInUser: user }),
  setToken: (token) => set({ token }),
  logout: () => {
    localStorage.removeItem("token");
    set({ loggedInUser: null, token: null });
  },
}));
