import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@core/components/ui/tabs';

const meta = {
  title: 'Core/UI/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="all" className="w-80">
      <TabsList>
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="lessons">Lessons</TabsTrigger>
        <TabsTrigger value="exercises">Exercises</TabsTrigger>
        <TabsTrigger value="community">Community</TabsTrigger>
      </TabsList>
      <TabsContent value="all"><p className="text-sm text-muted-foreground p-2">All content</p></TabsContent>
      <TabsContent value="lessons"><p className="text-sm text-muted-foreground p-2">Lesson list</p></TabsContent>
      <TabsContent value="exercises"><p className="text-sm text-muted-foreground p-2">Exercise list</p></TabsContent>
      <TabsContent value="community"><p className="text-sm text-muted-foreground p-2">Community posts</p></TabsContent>
    </Tabs>
  ),
};
