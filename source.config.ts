import { defineConfig, defineDocs } from 'fumadocs-mdx/config';

export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    files: ['*.{md,mdx}', '(framework)/*.{md,mdx}', 'react/*.{md,mdx}', 'react/basic/index.mdx'],
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
});

export default defineConfig();
