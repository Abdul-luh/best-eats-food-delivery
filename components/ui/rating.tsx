import { Star } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface RatingProps {
  value: number;
  max?: number;
  size?: number;
  className?: string;
}

export function Rating({ value, max = 5, size = 16, className }: RatingProps) {
  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={cn(
            i < Math.floor(value)
              ? "fill-amber-400 text-amber-400"
              : i < value
              ? "fill-amber-400/50 text-amber-400"
              : "fill-muted text-muted-foreground"
          )}
        />
      ))}
      <span className="ml-1 text-sm font-medium">{value.toFixed(1)}</span>
    </div>
  );
}
