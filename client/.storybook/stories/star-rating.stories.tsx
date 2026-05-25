import type { Meta, StoryObj } from '@storybook/react-vite';
import { StarRating } from '@core/components/ui/star-rating';

const meta = {
  title: 'Core/UI/StarRating',
  component: StarRating,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 5, step: 0.5 },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof StarRating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { value: 3 } };
export const Readonly: Story = { args: { value: 4.5, readonly: true } };
export const Interactive: Story = { args: { value: 3, readonly: false } };
export const Empty: Story = { args: { value: 0, readonly: true } };
export const Full: Story = { args: { value: 5, readonly: true } };
export const Small: Story = { args: { value: 4, size: 'sm', readonly: true } };
export const Large: Story = { args: { value: 4, size: 'lg', readonly: true } };
