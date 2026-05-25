import type { Meta, StoryObj } from '@storybook/react-vite';
import { LevelBadge } from '@core/components/ui/level-badge';

const meta = {
  title: 'Core/UI/LevelBadge',
  component: LevelBadge,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    level: {
      control: 'select',
      options: ['new', 'popular', 'beginner', 'intermediate', 'advanced'],
    },
  },
} satisfies Meta<typeof LevelBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const New: Story = { args: { level: 'new' } };
export const Popular: Story = { args: { level: 'popular' } };
export const Beginner: Story = { args: { level: 'beginner' } };
export const Intermediate: Story = { args: { level: 'intermediate' } };
export const Advanced: Story = { args: { level: 'advanced' } };

export const AllLevels: Story = {
  args: { level: 'new' },
  render: () => (
    <div className="flex gap-2">
      <LevelBadge level="new" />
      <LevelBadge level="popular" />
      <LevelBadge level="beginner" />
      <LevelBadge level="intermediate" />
      <LevelBadge level="advanced" />
    </div>
  ),
};
