import type { Meta, StoryObj } from '@storybook/react-vite';
import { Stepper } from '@core/components/ui/stepper';

const meta = {
  title: 'Core/UI/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    steps: {
      control: { type: 'range', min: 2, max: 8 },
    },
    currentStep: {
      control: { type: 'range', min: 0, max: 7 },
    },
  },
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { steps: 5, currentStep: 2 } };
export const Start: Story = { args: { steps: 5, currentStep: 0 } };
export const Complete: Story = { args: { steps: 5, currentStep: 4 } };
