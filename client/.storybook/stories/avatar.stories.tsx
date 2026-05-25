import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, AvatarFallback, AvatarImage } from '@core/components/ui/avatar';

const meta = {
  title: 'Core/UI/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithFallback: Story = {
  render: () => (
    <Avatar>
      <AvatarFallback>HI</AvatarFallback>
    </Avatar>
  ),
};

export const WithImage: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://api.dicebear.com/9.x/avataaars/svg?seed=hina" alt="Hina avatar" />
      <AvatarFallback>HI</AvatarFallback>
    </Avatar>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      {(['size-6', 'size-8', 'size-10', 'size-14', 'size-20'] as const).map((size) => (
        <Avatar key={size} className={size}>
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      ))}
    </div>
  ),
};
