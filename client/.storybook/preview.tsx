import type { Preview } from '@storybook/react-vite';
import '../src/index.css';

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    backgrounds: {
      default: 'garden-light',
      values: [
        { name: 'garden-light', value: '#f7f6f1' },
        { name: 'garden-dark', value: '#1a2e2a' },
        { name: 'white', value: '#ffffff' },
      ],
    },
    a11y: { test: 'todo' },
  },
};
export default preview;