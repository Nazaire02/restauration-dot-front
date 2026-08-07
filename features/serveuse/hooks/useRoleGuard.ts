import { useHydrated } from "@/hooks/useHydrated";
import { useSessionStore } from "@/store/useSessionStore";
import { Role, SessionUser } from "@/type";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useRoleGuard(role: Role): { user: SessionUser | null; ready: boolean } {
  const router = useRouter();
  const hydrated = useHydrated();
  const user = useSessionStore((s) => s.user);

//   useEffect(() => {
//     if (hydrated && (!user || user.role !== role)) {
//       router.push("/connexion");
//     }
//   }, [hydrated, user, role, router]);

  return { user, ready: hydrated && !!user && user.role === role };
}