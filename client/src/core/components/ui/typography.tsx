import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const typographyVariants = cva('', {
  variants: {
    variant: {
      // Headings — Playfair Display via font-heading
      h1: 'font-heading scroll-m-20 text-4xl font-bold tracking-tight leading-tight',
      h2: 'font-heading scroll-m-20 text-3xl font-bold tracking-tight leading-tight',
      h3: 'font-heading scroll-m-20 text-2xl font-semibold leading-snug',
      h4: 'font-heading scroll-m-20 text-xl font-semibold leading-snug',
      h5: 'font-heading scroll-m-20 text-lg font-semibold',
      h6: 'font-heading scroll-m-20 text-base font-semibold',
      // Body — Geist Variable via font-sans (default)
      p: 'leading-relaxed',
      lead: 'text-xl text-muted-foreground leading-relaxed',
      large: 'text-lg font-semibold',
      small: 'text-sm font-medium leading-none',
      muted: 'text-sm text-muted-foreground',
      // Special
      blockquote: 'border-l-2 border-primary/30 pl-6 italic text-muted-foreground',
      code: 'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
    },
  },
  defaultVariants: {
    variant: 'p',
  },
});

type VariantKey = NonNullable<VariantProps<typeof typographyVariants>['variant']>;

const defaultElements: Record<VariantKey, React.ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  p: 'p',
  lead: 'p',
  large: 'p',
  small: 'small',
  muted: 'p',
  blockquote: 'blockquote',
  code: 'code',
};

type TypographyProps = VariantProps<typeof typographyVariants> & {
  /** Override the rendered HTML element while keeping the visual style */
  as?: React.ElementType;
  className?: string;
  children?: React.ReactNode;
} & Omit<React.HTMLAttributes<HTMLElement>, 'className' | 'children'>;

export const Typography = ({
  variant = 'p',
  as,
  className,
  children,
  ...props
}: TypographyProps) => {
  const Tag = as ?? defaultElements[variant ?? 'p'];
  return (
    <Tag className={cn(typographyVariants({ variant }), className)} {...props}>
      {children}
    </Tag>
  );
};
