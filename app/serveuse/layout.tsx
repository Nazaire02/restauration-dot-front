import type { ReactNode } from "react";
import { GoldRule } from "@/components/common/GoldRule";
import { weddingConfig } from "@/lib/wedding-config";

interface GuestLayoutProps {
  children: ReactNode;
  aside?: ReactNode;
}

export default function GuestLayout({ children, aside }: Readonly<GuestLayoutProps>) {
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
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}