import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@core/components/ui/card';

const meta = {
  title: 'Core/UI/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [(Story: React.ComponentType) => <div className="w-72"><Story /></div>],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card>
      <CardContent>Simple card content.</CardContent>
    </Card>
  ),
};

export const WithHeader: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Learn naturally</CardTitle>
        <CardDescription>Engaging lessons that feel like a breath of fresh air.</CardDescription>
      </CardHeader>
      <CardContent>Start learning today with our guided lessons.</CardContent>
    </Card>
  ),
};

export const Small: Story = {
  render: () => (
    <Card size="sm">
      <CardHeader>
        <CardTitle>Quick tip</CardTitle>
      </CardHeader>
      <CardContent>每天学一点。</CardContent>
    </Card>
  ),
};
