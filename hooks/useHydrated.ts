import { useEffect, useState } from "react";

/** True once the client has hydrated — gate persisted (localStorage) state on it. */
export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}