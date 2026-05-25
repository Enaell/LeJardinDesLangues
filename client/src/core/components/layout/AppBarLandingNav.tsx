import { useTranslation } from '@core/hooks';
import { LANDING_NAV_ITEMS } from '@core/routes.config';
import { Button } from '@core/components/ui/button';
import { useAuthModalContext } from '@features/auth/components/AuthModalContext';

export const AppBarLandingNav = () => {
  const { t } = useTranslation();
  const { openModal } = useAuthModalContext();

  const handleScrollTo = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="hidden md:flex items-center gap-1 flex-grow">
      {LANDING_NAV_ITEMS.map((item) => (
        <Button
          key={item.sectionId}
          variant="ghost-white"
          size="sm"
          onClick={() => handleScrollTo(item.sectionId)}
        >
          {t(item.translationKey)}
        </Button>
      ))}
      <div className="ml-auto flex items-center gap-2">
        <Button variant="ghost-white" size="sm" onClick={() => openModal('login')}>
          {t('auth.login.submitButton')}
        </Button>
        <Button variant="inverted" size="sm" className="rounded-full px-5" onClick={() => openModal('register')}>
          {t('landing.cta')}
        </Button>
      </div>
    </nav>
  );
};
