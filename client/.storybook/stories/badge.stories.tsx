import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '@core/components/ui/badge';

const meta = {
  title: 'Core/UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'outline', 'destructive'],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { children: 'New' } };
export const Secondary: Story = { args: { variant: 'secondary', children: 'Popular' } };
export const Outline: Story = { args: { variant: 'outline', children: 'Beta' } };
export const Destructive: Story = { args: { variant: 'destructive', children: 'Removed' } };
