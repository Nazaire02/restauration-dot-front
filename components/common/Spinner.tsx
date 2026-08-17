import { cn } from "@/lib/utils";

const sizes = {
  sm: "size-4 border-2",
  md: "size-6 border-2",
  lg: "size-10 border-[3px]",
} as const;

interface SpinnerProps {
  size?: keyof typeof sizes;
  className?: string;
}

export function Spinner({ size = "md", className }: Readonly<SpinnerProps>) {
  return (
    <span
      role="status"
      aria-label="Chargement"
      className={cn(
        "inline-block animate-spin rounded-full border-primary-soft border-t-primary",
        sizes[size],
        className,
      )}
    />
  );
}
