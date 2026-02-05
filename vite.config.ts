import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  base: '/MADvids/',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        delightfullVideo: resolve(__dirname, 'experiments/delightfull-video/index.html'),
        autonomyDashboard: resolve(__dirname, 'experiments/autonomy-dashboard/index.html'),
        hyperpodCinematic: resolve(__dirname, 'experiments/hyperpod-cinematic/index.html'),
        hyperpodShowcase: resolve(__dirname, 'experiments/hyperpod-showcase/index.html'),
        hyperpodGrid: resolve(__dirname, 'experiments/hyperpod-grid/index.html'),
        hyperpodImmersive: resolve(__dirname, 'experiments/hyperpod-immersive/index.html'),
        chromaticShift: resolve(__dirname, 'experiments/chromatic-shift/index.html'),
        meshFlow: resolve(__dirname, 'experiments/mesh-flow/index.html'),
        lumina: resolve(__dirname, 'experiments/lumina/index.html'),
      },
    },
  },
})
