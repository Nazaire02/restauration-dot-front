import { cn } from "@/lib/utils";

export function GoldRule({ className }: Readonly<{ className?: string }>) {
  return <span aria-hidden className={cn("gold-rule block", className)} />;
}   