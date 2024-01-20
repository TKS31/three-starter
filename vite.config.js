import { defineConfig } from "vite";
import autoprefixer from "autoprefixer";
import glsl from 'vite-plugin-glsl';

export default defineConfig({
  server: {
    host: true
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/js/[name][hash].js',
        chunkFileNames: 'assets/js/[name][hash].js',
        assetFileNames: ({name}) => {
          if (/\.(jpe?g|png|gif|svg|webp|avif)$/.test(name)) {
            return 'assets/img/[hash][extname]';
          }
          if (/\.(woff2?|fnt)$/.test(name)) {
            return 'assets/font/[hash][extname]';
          }
          if (/\.(s?css)$/.test(name)) {
            return 'assets/css/[name][hash][extname]';
          }
          return 'assets/[hash][extname]';
        }
      }
    },
    emptyOutDir: true
  },
  css: {
    postcss: {
      plugins: [
        autoprefixer()
      ]
    }
  },
  plugins: [
    glsl()
  ]
});