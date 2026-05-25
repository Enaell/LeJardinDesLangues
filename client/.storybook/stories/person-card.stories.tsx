import type { Meta, StoryObj } from '@storybook/react-vite';
import { PersonCard } from '@core/components/ui/person-card';

const meta = {
  title: 'Core/UI/PersonCard',
  component: PersonCard,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div className="w-48">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PersonCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { name: 'Hina', role: 'Co-founder & CEO' },
};

export const WithSocialLinks: Story = {
  args: {
    name: 'Kenji',
    role: 'CTO',
    socialLinks: [
      { type: 'twitter', url: '#' },
      { type: 'linkedin', url: '#' },
    ],
  },
};

export const WithAvatar: Story = {
  args: {
    name: 'Sora',
    role: 'Head of Design',
    avatarSrc: 'https://api.dicebear.com/9.x/avataaars/svg?seed=sora',
  },
};
