import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@core/components/ui/select';

const meta = {
  title: 'Core/UI/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <Select value={value} onValueChange={(val) => setValue(val ?? '')}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Select a language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="japanese">Japanese</SelectItem>
          <SelectItem value="korean">Korean</SelectItem>
          <SelectItem value="chinese">Chinese</SelectItem>
          <SelectItem value="french">French</SelectItem>
          <SelectItem value="spanish">Spanish</SelectItem>
        </SelectContent>
      </Select>
    );
  },
};
