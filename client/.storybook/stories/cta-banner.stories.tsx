import type { Meta, StoryObj } from '@storybook/react-vite';
import { CtaBanner } from '@core/components/ui/cta-banner';

const meta = {
  title: 'Core/UI/CtaBanner',
  component: CtaBanner,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div className="p-6">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CtaBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Ready to grow your language garden?',
    ctaLabel: 'Start growing for free 🌿',
  },
};

export const WithDescription: Story = {
  args: {
    title: 'Ready to grow your language garden?',
    ctaLabel: 'Start growing for free 🌿',
    description: 'Join thousands of learners today.',
  },
};
