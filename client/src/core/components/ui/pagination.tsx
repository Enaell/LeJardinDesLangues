import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@core/components/ui/button";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

type PaginationProps = React.ComponentProps<"nav">;

function Pagination({ className, ...props }: PaginationProps) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  );
}

function PaginationItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="pagination-item"
      className={cn("", className)}
      {...props}
    />
  );
}

type PaginationLinkProps = {
  isActive?: boolean;
} & React.ComponentProps<"button">;

function PaginationLink({ className, isActive, ...props }: PaginationLinkProps) {
  return (
    <button
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-lg border text-sm font-medium transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50",
        isActive
          ? "border-border bg-background text-foreground shadow-sm"
          : "border-transparent hover:bg-muted hover:text-foreground",
        className
      )}
      {...props}
    />
  );
}

function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <Button
      aria-label="Go to previous page"
      variant="ghost"
      size="icon"
      className={cn("gap-1", className)}
      {...props}
    >
      <ChevronLeft className="size-4" />
    </Button>
  );
}

function PaginationNext({
  className,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <Button
      aria-label="Go to next page"
      variant="ghost"
      size="icon"
      className={cn("gap-1", className)}
      {...props}
    >
      <ChevronRight className="size-4" />
    </Button>
  );
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
