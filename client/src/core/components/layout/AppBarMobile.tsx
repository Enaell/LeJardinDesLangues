import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import { Menu, X } from 'lucide-react';
import { useTranslation } from '@core/hooks';
import { APP_NAV_ITEMS } from '@core/routes.config';

export const AppBarMobile = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex md:hidden relative">
      <button
        aria-label={t('common.menu')}
        onClick={() => setOpen((v) => !v)}
        className="p-2 rounded-md text-primary-foreground hover:bg-white/10 transition-all"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 w-48 rounded-md border border-white/20 bg-primary shadow-md z-50">
          {APP_NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-4 py-3 text-sm text-primary-foreground/90 hover:text-primary-foreground hover:bg-white/10 transition-all"
            >
              {item.icon} {t(item.translationKey)}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
