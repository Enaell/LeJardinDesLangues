import { useTranslation } from '@core/hooks';
import { Typography } from '@core/components/ui/typography';
import { PersonCard } from '@core/components/ui/person-card';

const TEAM_MEMBERS = [
  { name: 'Hina', roleKey: 'landing.team.hina.role', fallback: 'HI' },
  { name: 'Kenji', roleKey: 'landing.team.kenji.role', fallback: 'KE' },
  { name: 'Sora', roleKey: 'landing.team.sora.role', fallback: 'SO' },
  { name: 'Minho', roleKey: 'landing.team.minho.role', fallback: 'MI' },
];

export const TeamSection = () => {
  const { t } = useTranslation();

  return (
    <section id="team" className="py-16 px-6 md:px-16 lg:px-24 bg-muted-dark">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Typography variant="h2" className="mb-3">
            {t('landing.team.title')}
          </Typography>
          <div className="w-12 h-1 bg-primary rounded-full mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM_MEMBERS.map((member) => (
            <PersonCard
              key={member.name}
              name={member.name}
              role={t(member.roleKey)}
              avatarFallback={member.fallback}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
