import type { Meta, StoryObj } from '@storybook/react-vite';
import { LanguageSelector } from '@core/components/ui/language-selector';

const meta = {
  title: 'Core/UI/LanguageSelector',
  component: LanguageSelector,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof LanguageSelector>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Small: Story = {
  args: { size: 'sm' },
};
