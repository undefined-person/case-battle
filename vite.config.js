import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  assetsInclude: ['**/*.tgs'],
  build: {
    assetsInlineLimit: 0,
  },
  resolve: {
    alias: {
      '@assets': '/src/shared/assets',
    },
  },
})
