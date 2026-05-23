import * as React from "react";
import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

type StarRatingProps = {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  readonly?: boolean;
  onChange?: (value: number) => void;
  className?: string;
};

const sizeClasses = {
  sm: 'size-3.5',
  md: 'size-5',
  lg: 'size-6',
};

export const StarRating = ({
  value,
  max = 5,
  size = 'md',
  readonly = false,
  onChange,
  className,
}: StarRatingProps) => {
  const [hovered, setHovered] = React.useState<number | null>(null);

  const display = hovered ?? value;

  return (
    <div
      role={readonly ? undefined : 'slider'}
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      className={cn('flex items-center gap-0.5', className)}
    >
      {Array.from({ length: max }, (_, i) => {
        const starValue = i + 1;
        const filled = display >= starValue;
        const halfFilled = !filled && display >= starValue - 0.5;

        return (
          <button
            key={i}
            type="button"
            disabled={readonly}
            aria-label={`Rate ${starValue} out of ${max}`}
            onClick={() => !readonly && onChange?.(starValue)}
            onMouseEnter={() => !readonly && setHovered(starValue)}
            onMouseLeave={() => !readonly && setHovered(null)}
            className={cn(
              'relative transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-default',
              !readonly && 'hover:scale-110 cursor-pointer'
            )}
          >
            <Star
              className={cn(
                sizeClasses[size],
                filled
                  ? 'fill-amber-400 text-amber-400'
                  : halfFilled
                    ? 'fill-amber-200 text-amber-400'
                    : 'fill-none text-muted-foreground'
              )}
            />
          </button>
        );
      })}
    </div>
  );
};
