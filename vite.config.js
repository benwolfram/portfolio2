import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Required for GitHub Pages: use your repo name; use '/' if using username.github.io
  base: '/mesh-gradient/',
})
