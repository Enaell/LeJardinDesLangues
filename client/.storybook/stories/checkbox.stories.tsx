import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '@core/components/ui/checkbox';

const meta = {
  title: 'Core/UI/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Disabled: Story = { args: { disabled: true } };
