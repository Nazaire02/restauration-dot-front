import { useEffect, useState } from "react";

/** True once the client has hydrated — gate persisted (localStorage) state on it. */
export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);

  const handleHydrated = (value: boolean) => {
    if (typeof window !== "undefined") {
      setHydrated(value);
    }
  };
  useEffect(() => handleHydrated(true), []);
  return hydrated;
}