"use client";

import { motion } from "motion/react";
import { RefreshCw, TriangleAlert, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GoldRule } from "@/components/common/GoldRule";
import { Spinner } from "@/components/common/Spinner";
import { cn } from "@/lib/utils";

const FALLBACK_MESSAGE = "Vérifiez votre connexion, puis réessayez dans un instant.";

interface ErrorStateProps {
  title?: string;
  message?: string | null;
  onRetry?: () => void;
  retryLabel?: string;
  retrying?: boolean;
  icon?: LucideIcon;
  variant?: "block" | "inline";
  className?: string;
}

export function ErrorState({
  title = "Chargement impossible",
  message,
  onRetry,
  retryLabel = "Réessayer",
  retrying = false,
  icon: Icon = TriangleAlert,
  variant = "block",
  className,
}: Readonly<ErrorStateProps>) {
  const description = message?.trim() ? message : FALLBACK_MESSAGE;

  if (variant === "inline") {
    return (
      <motion.div
        role="alert"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "flex flex-wrap items-center gap-3 rounded-full border border-destructive/25 bg-destructive/10 px-4 py-2.5",
          className,
        )}
      >
        <Icon className="size-4 shrink-0 text-destructive" aria-hidden />
        <p className="min-w-0 flex-1 text-sm text-secondary-foreground">{description}</p>
        {onRetry ? (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onRetry}
            disabled={retrying}
            className="rounded-full text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            {retrying ? <Spinner size="sm" /> : <RefreshCw className="size-4" aria-hidden />}
            <span>{retryLabel}</span>
          </Button>
        ) : null}
      </motion.div>
    );
  }

  return (
    <motion.div
      role="alert"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "surface-card flex flex-col items-center justify-center px-6 py-14 text-center",
        className,
      )}
    >
      <span className="grid size-12 place-items-center rounded-full bg-destructive/10 text-destructive">
        <Icon className="size-5" aria-hidden />
      </span>
      <p className="text-display mt-4 text-xl text-foreground">{title}</p>
      <GoldRule className="mt-3" />
      <p className="mt-3 max-w-sm text-sm text-muted-foreground">{description}</p>
      {onRetry ? (
        <Button
          type="button"
          variant="outline"
          onClick={onRetry}
          disabled={retrying}
          className="mt-6 min-h-11 rounded-full px-6"
        >
          {retrying ? <Spinner size="sm" /> : <RefreshCw className="size-4" aria-hidden />}
          <span>{retryLabel}</span>
        </Button>
      ) : null}
    </motion.div>
  );
}
