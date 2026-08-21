import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { SessionUser } from "@/type";
import { Session } from "../types/auth";

type UserState = {
  user: SessionUser | null;
  token: string | null;
};

type UserActions = {
  setSession: (session: Session) => void;
  setUser: (user: SessionUser) => void;
  setToken: (token: string) => void;
  logout: () => void;
};

type UserStore = UserState & UserActions;

const initialState: UserState = {
  user: null,
  token: null,
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      ...initialState,
      setSession: ({ user, token }) => set({ user, token: token ?? null }),
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      logout: () => set({ ...initialState }),
    }),
    {
      name: "dot-user",
      storage: createJSONStorage(() => localStorage),
      partialize: ({ user, token }) => ({ user, token }),
    },
  ),
);

export const selectUser = (state: UserStore) => state.user;
export const selectToken = (state: UserStore) => state.token;
export const selectIsAuthenticated = (state: UserStore) => Boolean(state.token);

export const getAuthToken = () => useUserStore.getState().token;
export const getCurrentUser = () => useUserStore.getState().user;
export const clearSession = () => useUserStore.getState().logout();
