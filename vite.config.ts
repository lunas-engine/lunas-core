import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, 'src/lunas/index.ts'),
      formats: ['es'],
      fileName: 'lunas',
    },
  },
  esbuild: {
    target: 'es2022',
  },
  plugins: [dts({ include: 'src/lunas', rollupTypes: true })],
});
