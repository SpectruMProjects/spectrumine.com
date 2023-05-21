import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react-swc'
import { visualizer } from 'rollup-plugin-visualizer'

const config = defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: 'stats.html'
    })
  ],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }]
  }
})
// https://vitejs.dev/config/
export default config
