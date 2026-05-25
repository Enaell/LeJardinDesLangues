import type { Meta, StoryObj } from '@storybook/react-vite';
import { TestimonialCard } from '@core/components/ui/testimonial-card';

const meta = {
  title: 'Core/UI/TestimonialCard',
  component: TestimonialCard,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TestimonialCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    quote: 'LinguaGarden transformed my learning.',
    authorName: 'Emma R.',
    authorRole: 'Advanced learner',
  },
};

export const WithRating: Story = {
  args: {
    quote: '每天学中文很有趣！',
    authorName: 'Mei L.',
    authorRole: 'Beginner',
    rating: 4,
  },
};

export const FiveStars: Story = {
  args: {
    quote: 'The garden metaphor is so peaceful.',
    authorName: 'Thomas K.',
    authorRole: 'Intermediate learner',
    rating: 5,
  },
};
