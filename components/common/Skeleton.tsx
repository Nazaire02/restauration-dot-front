import { cn } from "@/lib/utils";


export function Skeleton({ className }: Readonly<{ className?: string }>) {
  return <span aria-hidden className={cn("skeleton block", className)} />;
}

interface SkeletonTextProps {
  lines?: number;
  className?: string;
}

export function SkeletonText({ lines = 2, className }: Readonly<SkeletonTextProps>) {
  return (
    <span className={cn("block space-y-2", className)}>
      {Array.from({ length: lines }, (_, index) => (
        <Skeleton
          key={index}
          className={cn("h-3.5", index === lines - 1 ? "w-2/3" : "w-full")}
        />
      ))}
    </span>
  );
}
