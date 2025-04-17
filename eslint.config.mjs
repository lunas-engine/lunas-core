import { defineConfig, globalIgnores } from 'eslint/config';
import lunasConfig from '@lunas-engine/eslint-config';

export default defineConfig([
  globalIgnores(['./dist/**', 'node_modules/**', 'vite.config.ts', 'eslint.config.mjs']),
  lunasConfig,
]);
