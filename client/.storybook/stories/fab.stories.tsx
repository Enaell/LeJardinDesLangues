import type { Meta, StoryObj } from '@storybook/react-vite';
import { BookOpen } from 'lucide-react';
import { Fab } from '@core/components/ui/fab';

const meta = {
  title: 'Core/UI/Fab',
  component: Fab,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Fab>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { label: 'Add item' } };
export const Small: Story = { args: { size: 'sm' } };
export const Large: Story = { args: { size: 'lg' } };

export const CustomIcon: Story = {
  render: () => <Fab icon={<BookOpen />} label="Open book" />,
};
