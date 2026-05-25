import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Menu, X } from 'lucide-react';
import { useTranslation } from '@core/hooks';
import { APP_NAV_ITEMS } from '@core/routes.config';
import { Button, buttonVariants } from '@core/components/ui/button';
import { cn } from '@/lib/utils';

export const AppBarMobile = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex md:hidden relative">
      <Button
        variant="ghost"
        size="icon"
        aria-label={t('common.menu')}
        onClick={() => setOpen((v) => !v)}
        className="text-primary-foreground hover:bg-white/10"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>
      {open && (
        <div className="absolute right-0 top-full mt-1 w-48 rounded-md border border-white/20 bg-primary shadow-md z-50">
          {APP_NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'sm' }),
                'w-full justify-start h-auto py-3 rounded-none text-primary-foreground/90 hover:text-primary-foreground hover:bg-white/10 first:rounded-t-md last:rounded-b-md'
              )}
            >
              {item.icon} {t(item.translationKey)}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
