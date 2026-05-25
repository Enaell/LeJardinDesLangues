import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from '@core/components/ui/switch';

const meta = {
  title: 'Core/UI/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Checked: Story = { args: { defaultChecked: true } };
export const Disabled: Story = { args: { disabled: true } };
