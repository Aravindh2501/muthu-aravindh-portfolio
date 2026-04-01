import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    // Force all packages (including @splinetool/react-spline) to use the
    // same Three.js instance as React Three Fiber — prevents the
    // "Multiple instances of Three.js" error and the R3F hook crash.
    alias: {
      three: path.resolve('./node_modules/three'),
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'three', 'gsap'],
  },
  build: {
    chunkSizeWarningLimit: 3000,
  },
})
