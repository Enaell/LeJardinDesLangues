import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Menu } from 'lucide-react';
import { useTranslation } from '@core/hooks';
import type { NavigationItem } from '@core/routes.config';

type AppBarMobileProps = {
  navigationItems: NavigationItem[];
};

export const AppBarMobile = ({ navigationItems }: AppBarMobileProps) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex md:hidden relative">
      <button
        aria-label={t('common.menu')}
        onClick={() => setOpen((v) => !v)}
        className="p-2 rounded-md hover:bg-accent"
      >
        <Menu className="h-5 w-5" />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 w-48 rounded-md border bg-popover shadow-md z-50">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-accent"
            >
              {item.icon} {t(item.translationKey)}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
