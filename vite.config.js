import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// MUST exactly match your repo name:
const base = '/mini-e-commerce-multi-page/'

export default defineConfig({
  plugins: [react()],
  base,
  build: { outDir: 'docs' }   // <— output to /docs
})