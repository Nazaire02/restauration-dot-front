"use client";

import type { ReactNode } from "react";
import { GoldRule } from "@/components/common/GoldRule";
import { weddingConfig } from "@/lib/wedding-config";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { clearSession, getCurrentUser } from "@/features/connexion/store/useUserStore";
import { useHydrated } from "@/hooks/useHydrated";

interface GuestLayoutProps {
  children: ReactNode;
  aside?: ReactNode;
}

export default function AdminLayout({ children, aside }: Readonly<GuestLayoutProps>) {
  const router = useRouter()
  const currentUser = getCurrentUser()
  const pathname = usePathname();
  const navItems = [
    { label: "Tableau de bord", to: "/admin" },
    { label: "Commandes", to: "/admin/commandes" },
    { label: "Serveuses", to: "/admin/serveuses" },
    { label: "Menu", to: "/admin/menu" },
  ];

  if (currentUser?.role != "admin") {
    clearSession();
    return router.replace("/")
  }
    
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border/70 bg-background/85 backdrop-blur">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6">
          <div className="min-w-0">
            <p className="text-display truncate text-lg font-semibold text-foreground">
              {weddingConfig.groom} &amp; {weddingConfig.bride}
            </p>
            <GoldRule className="mt-1 w-10" />
          </div>
          {aside ? <div className="shrink-0">{aside}</div> : null}
        </div>
        <nav aria-label="Navigation principale" className="mx-auto max-w-6xl px-4 sm:px-6">
          <ul className="flex gap-1 overflow-x-auto pb-2">
            {navItems.map((item, index) => {
              const active = pathname === item.to;
              return (
                <li key={index + 1}>
                  <Link
                    href={item.to}
                    className={cn(
                      "inline-flex min-h-11 items-center whitespace-nowrap rounded-full px-4 text-sm transition-colors",
                      active
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}