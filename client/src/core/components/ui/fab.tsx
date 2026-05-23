import * as React from "react";
import { Plus } from "lucide-react";

import { cn } from "@/lib/utils";

type FabProps = {
  icon?: React.ReactNode;
  onClick?: () => void;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const sizeClasses = {
  sm: 'size-10 [&_svg]:size-4',
  md: 'size-12 [&_svg]:size-5',
  lg: 'size-14 [&_svg]:size-6',
};

export const Fab = ({ icon, onClick, label, size = 'md', className }: FabProps) => {
  return (
    <button
      type="button"
      aria-label={label ?? 'Action'}
      onClick={onClick}
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-all outline-none hover:bg-primary/90 hover:shadow-xl active:scale-95 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
        sizeClasses[size],
        className
      )}
    >
      {icon ?? <Plus />}
    </button>
  );
};
