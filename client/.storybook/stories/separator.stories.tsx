import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Separator } from '@core/components/ui/separator';

const meta = {
  title: 'Core/UI/Separator',
  component: Separator,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  decorators: [(Story: React.ComponentType) => <div className="w-64"><Story /></div>],
};

export const Vertical: Story = {
  args: { orientation: 'vertical' },
  decorators: [(Story: React.ComponentType) => <div className="h-16 flex items-center"><Story /></div>],
};
