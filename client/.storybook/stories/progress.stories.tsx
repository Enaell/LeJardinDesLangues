import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from '@core/components/ui/progress';

const meta = {
  title: 'Core/UI/Progress',
  component: Progress,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [(Story: React.ComponentType) => <div className="w-72"><Story /></div>],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100 } },
  },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { value: 60 } };
export const Empty: Story = { args: { value: 0 } };
export const Full: Story = { args: { value: 100 } };
