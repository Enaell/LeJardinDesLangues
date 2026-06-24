import { createFileRoute } from '@tanstack/react-router';

import { Footer } from '@core/components/layout';
import { CtaBanner } from '@core/components/ui/cta-banner';
import { useParallax } from '@core/hooks';
import { useAuthModalContext } from '@features/auth/components/AuthModalContext';
import {
  HeroSection,
  FeaturesSection,
  HowItWorksSection,
  LanguagesSection,
  WhyUsSection,
  TeamSection,
} from '@features/landing';

const HomePage = () => {
  const { openModal } = useAuthModalContext();

  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <LanguagesSection />
      <WhyUsSection />
      <TeamSection />
      <CtaBanner
        title="Ready to grow your language garden?"
        ctaLabel="Start growing for free 🌿"
        onCtaClick={() => openModal('register')}
        className="rounded-none mx-0 bg-[#2d4a3e] text-white"
      />
      <Footer />
    </>
  );
};

export const Route = createFileRoute('/')({
  component: HomePage,
});

