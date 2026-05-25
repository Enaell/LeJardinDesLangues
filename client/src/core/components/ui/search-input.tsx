import * as React from "react";
import { Search, SlidersHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";

type SearchInputProps = React.ComponentProps<'input'> & {
  onSearch?: (value: string) => void;
  onFilterClick?: () => void;
  showFilterButton?: boolean;
};

export const SearchInput = ({
  onSearch,
  onFilterClick,
  showFilterButton = false,
  className,
  onChange,
  ...props
}: SearchInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
    onSearch?.(e.target.value);
  };

  return (
    <div className={cn('relative flex items-center', className)}>
      <Search className="pointer-events-none absolute left-2.5 size-4 text-muted-foreground" />
      <input
        type="search"
        data-slot="search-input"
        className={cn(
          'h-9 w-full rounded-lg border border-input bg-background py-1 pl-9 pr-3 text-sm transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50',
          showFilterButton && 'pr-10'
        )}
        onChange={handleChange}
        {...props}
      />
      {showFilterButton && (
        <button
          type="button"
          aria-label="Filters"
          onClick={onFilterClick}
          className="absolute right-2 flex size-5 items-center justify-center rounded text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <SlidersHorizontal className="size-4" />
        </button>
      )}
    </div>
  );
};
