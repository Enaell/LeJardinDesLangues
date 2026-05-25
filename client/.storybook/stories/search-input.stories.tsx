import type { Meta, StoryObj } from '@storybook/react-vite';
import { SearchInput } from '@core/components/ui/search-input';

const meta = {
  title: 'Core/UI/SearchInput',
  component: SearchInput,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placeholder: 'Search for a word…' },
};

export const WithFilterButton: Story = {
  args: { showFilterButton: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};
