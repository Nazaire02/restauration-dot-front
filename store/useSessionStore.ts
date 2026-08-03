import { demoAccounts } from "@/mock-data/staff.mock";
import { SessionUser } from "@/type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SessionState {
  user: SessionUser | null;
  login: (email: string, password: string) => SessionUser | null;
  logout: () => void;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      user: null,
      login: (email, password) => {
        const account = demoAccounts.find(
          (candidate) => candidate.email === email && candidate.password === password,
        );

        if (!account) return null;

        set({ user: account.user });
        return account.user;
      },
      logout: () => set({ user: null }),
    }),
    { name: "dot-session" },
  ),
);
