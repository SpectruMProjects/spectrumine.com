import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'
import { string } from 'prop-types'

const config = defineConfig({
  plugins: [react()],
  resolve: {    
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') }
    ]
  }
})
// https://vitejs.dev/config/
export default config