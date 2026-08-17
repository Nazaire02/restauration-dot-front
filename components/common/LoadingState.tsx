import { GoldRule } from "@/components/common/GoldRule";
import { Spinner } from "@/components/common/Spinner";
import { cn } from "@/lib/utils";

interface LoadingStateProps {
  title?: string;
  description?: string;
  variant?: "block" | "inline";
  className?: string;
}

export function LoadingState({
  title = "Préparation en cours",
  description,
  variant = "block",
  className,
}: Readonly<LoadingStateProps>) {
  if (variant === "inline") {
    return (
      <p
        className={cn("flex items-center gap-2.5 text-sm text-muted-foreground", className)}
        aria-live="polite"
      >
        <Spinner size="sm" />
        <span>{title}</span>
      </p>
    );
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-border bg-card/60 px-6 py-16 text-center",
        className,
      )}
    >
      <Spinner size="lg" />
      <p className="text-display mt-5 text-xl text-foreground">{title}</p>
      <GoldRule className="mt-3" />
      {description ? (
        <p className="mt-3 max-w-sm text-sm text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}
