import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/** True once the client has hydrated — gate persisted (localStorage) state on it. */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,  // client
    () => false, // server
  );
}