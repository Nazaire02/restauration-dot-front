import { GoldRule } from "@/components/common/GoldRule";
import { Reveal } from "@/components/common/Reveal";
import type { ReactNode } from "react";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}

export function PageHeader({ eyebrow, title, description, actions }: Readonly<PageHeaderProps>) {
  return (
    <Reveal className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 sm:flex sm:flex-wrap sm:justify-between">
      <div className="min-w-0">
        {eyebrow ? (
          <p className="text-xs uppercase tracking-[0.24em] text-primary">{eyebrow}</p>
        ) : null}
        <h1 className="text-display mt-2 text-3xl font-semibold text-foreground sm:text-4xl">
          {title}
        </h1>
        <GoldRule className="mt-3" />
        {description ? (
          <p className="mt-3 max-w-xl text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="shrink-0">{actions}</div> : null}
    </Reveal>
  );
}