import { cn } from "@/lib/utils";

type LevelBadgeProps = {
  level: 'new' | 'popular' | 'beginner' | 'intermediate' | 'advanced';
  className?: string;
};

const levelStyles: Record<LevelBadgeProps['level'], string> = {
  new: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  popular: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  beginner: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  intermediate: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  advanced: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
};

const levelLabels: Record<LevelBadgeProps['level'], string> = {
  new: 'New',
  popular: 'Popular',
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
};

export const LevelBadge = ({ level, className }: LevelBadgeProps) => {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        levelStyles[level],
        className
      )}
    >
      {levelLabels[level]}
    </span>
  );
};
