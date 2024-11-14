/// <reference types="vitest" />

import path from 'path'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import { coverageConfigDefaults } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest-setup.ts'],
    coverage: {
      exclude: [
        '**/main.tsx',
        'postcss.config.js',
        'tailwind.config.js',
        '**/types/**',
        ...coverageConfigDefaults.exclude,
      ],
    },
  },
})
