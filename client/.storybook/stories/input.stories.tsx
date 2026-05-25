import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '@core/components/ui/input';

const meta = {
  title: 'Core/UI/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [(Story: React.ComponentType) => <div className="w-64"><Story /></div>],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: {} };
export const WithPlaceholder: Story = { args: { placeholder: 'Search for a word…' } };
export const Disabled: Story = { args: { placeholder: 'Disabled field', disabled: true } };
export const Invalid: Story = { args: { 'aria-invalid': true, defaultValue: 'user@example' } };
