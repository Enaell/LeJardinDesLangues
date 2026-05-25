import type { Meta, StoryObj } from '@storybook/react-vite';
import { FeatureCard } from '@core/components/ui/feature-card';

const meta = {
  title: 'Core/UI/FeatureCard',
  component: FeatureCard,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div className="w-64">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FeatureCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { title: 'Learn naturally' },
  render: () => (
    <FeatureCard
      image={<span className="text-5xl">🌿</span>}
      title="Learn naturally"
      description="Engaging lessons that feel like a breath of fresh air."
    />
  ),
};

export const GrowthCard: Story = {
  args: { title: 'Track your growth' },
  render: () => (
    <FeatureCard
      image={<span className="text-5xl">🎋</span>}
      title="Track your growth"
      description="See your progress come to life."
    />
  ),
};

export const NoImage: Story = {
  args: { title: 'Stay motivated' },
  render: () => (
    <FeatureCard
      title="Stay motivated"
      description="A peaceful space that inspires you every day."
    />
  ),
};
