import type { Meta, StoryObj } from '@storybook/react-vite';
import { Typography } from '@core/components/ui/typography';

const meta = {
  title: 'Core/UI/Typography',
  component: Typography,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'lead', 'large', 'small', 'muted', 'blockquote', 'code'],
    },
  },
} satisfies Meta<typeof Typography>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: {
    variant: 'p',
    children: 'Le Jardin des Langues — Typography playground',
  },
};

export const Headings: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Typography variant="h1">H1 — Le Jardin des Langues</Typography>
      <Typography variant="h2">H2 — Apprendre le chinois</Typography>
      <Typography variant="h3">H3 — Dictionnaire interactif</Typography>
      <Typography variant="h4">H4 — Mes decks de flashcards</Typography>
      <Typography variant="h5">H5 — Niveau intermédiaire</Typography>
      <Typography variant="h6">H6 — Catégorie vocabulaire</Typography>
    </div>
  ),
};

export const Body: Story = {
  render: () => (
    <div className="flex flex-col gap-4 max-w-lg">
      <Typography variant="lead">
        Lead — Une application pensée pour l&apos;apprentissage immersif des langues, du chinois au français.
      </Typography>
      <Typography variant="p">
        Paragraph — Explorez des milliers de mots, créez vos propres decks de flashcards et progressez à votre rythme grâce à des exercices ludiques.
      </Typography>
      <Typography variant="large">Large — Commencer maintenant</Typography>
      <Typography variant="small">Small — Inscription gratuite, sans carte bancaire</Typography>
      <Typography variant="muted">Muted — Dernière mise à jour il y a 3 jours</Typography>
    </div>
  ),
};

export const Special: Story = {
  render: () => (
    <div className="flex flex-col gap-6 max-w-lg">
      <Typography variant="blockquote">
        « La langue est la carte routière d&apos;une culture. Elle vous dit d&apos;où viennent les gens et où ils vont. »
      </Typography>
      <Typography variant="code">npm run storybook</Typography>
    </div>
  ),
};

export const AsPropOverride: Story = {
  name: 'Prop `as` — override de l\'élément HTML',
  render: () => (
    <div className="flex flex-col gap-3">
      <Typography variant="h2" as="span" className="block">
        Style h2 rendu en &lt;span&gt; (inline)
      </Typography>
      <Typography variant="muted" as="li">
        Style muted rendu en &lt;li&gt;
      </Typography>
      <Typography variant="small" as="span">
        Style small rendu en &lt;span&gt;
      </Typography>
    </div>
  ),
};

export const OnDarkBackground: Story = {
  name: 'Sur fond sombre (hero)',
  parameters: { backgrounds: { default: 'dark' } },
  render: () => (
    <div className="flex flex-col gap-4 p-8 bg-gray-900">
      <Typography variant="h1" className="text-5xl text-white">
        Parlez la langue du monde
      </Typography>
      <Typography variant="lead" className="text-white/80">
        Une façon naturelle et efficace d&apos;apprendre le chinois.
      </Typography>
      <Typography variant="small" className="text-white/60 font-normal">
        Rejoignez 10 000+ apprenants • Gratuit
      </Typography>
    </div>
  ),
};
