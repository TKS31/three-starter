import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl';

export default defineConfig({
  server: {
    host: true,
  },
  resolve: {
    alias: [
      { find: '@/', replacement: `${__dirname}/src/` }
    ]
  },
  build: {
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/js/[name][hash].js',
        assetFileNames: ({ name = ''}) => {
          if (/\.(jpe?g|png|gif|svg|webp|avif)$/.test(name)) {
            return 'assets/images/[hash][extname]';
          }
          if (/\.(woff2?|fnt)$/.test(name)) {
            return 'assets/fonts/[hash][extname]';
          }
          if (/\.(s?css)$/.test(name)) {
            return 'assets/css/[name][hash][extname]';
          }
          return 'assets/[hash][extname]';
        }
      },
    }
  },
  plugins: [
    glsl()
  ]
});