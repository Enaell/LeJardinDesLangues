import type { Meta, StoryObj } from '@storybook/react';
import { Leaf } from 'lucide-react';
import { Button } from '@core/components/ui/button';

const meta = {
  title: 'Core/UI/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline', 'secondary', 'ghost', 'destructive', 'link'],
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'icon', 'xs'],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { children: 'Start your journey' } };
export const Outline: Story = { args: { variant: 'outline', children: 'Explore features' } };
export const Secondary: Story = { args: { variant: 'secondary', children: 'Learn more' } };
export const Ghost: Story = { args: { variant: 'ghost', children: 'Cancel' } };
export const Destructive: Story = { args: { variant: 'destructive', children: 'Delete account' } };
export const Link: Story = { args: { variant: 'link', children: "It's free to begin" } };
export const WithIcon: Story = {
  args: { children: <><Leaf className="size-4" /> Start growing</>, variant: 'default' },
};
export const Small: Story = { args: { size: 'sm', children: 'Small' } };
export const Large: Story = { args: { size: 'lg', children: 'Start growing' } };
export const Disabled: Story = { args: { children: 'Disabled', disabled: true } };
