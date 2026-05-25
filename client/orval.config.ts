import { defineConfig } from 'orval';

export default defineConfig({
  'le-jardin': {
    input: {
      target: '../openapi.json',
    },
    output: {
      mode: 'tags-split',
      target: 'src/core/api',
      schemas: 'src/core/api/model',
      client: 'react-query',
      mock: false,
      tsconfig: './tsconfig.app.json',
      override: {
        mutator: {
          path: 'src/core/services/apiClient.ts',
          name: 'apiClient',
        },
        query: {
          useQuery: true,
          useMutation: true,
          signal: true,
        },
      },
    },
  },
});

