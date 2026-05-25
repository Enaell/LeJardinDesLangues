import type { Meta, StoryObj } from '@storybook/react';
import { Label } from '@core/components/ui/label';

const meta = {
  title: 'Core/UI/Label',
  component: Label,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { children: 'Email address' } };
