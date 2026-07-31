import { GuestSeat } from "@/type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface GuestState {
  seat: GuestSeat | null;
  activeOrderId: string | null;
  setSeat: (seat: GuestSeat) => void;
  setActiveOrderId: (id: string | null) => void;
  reset: () => void;
}

export const useGuestStore = create<GuestState>()(
  persist(
    (set) => ({
      seat: null,
      activeOrderId: null,
      setSeat: (seat) => set({ seat }),
      setActiveOrderId: (activeOrderId) => set({ activeOrderId }),
      reset: () => set({ seat: null, activeOrderId: null }),
    }),
    { name: "dot-guest" },
  ),
);