import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  preview: {
    host: true,
    port: 10000,
    allowedHosts: [
      "hr-management-system-6-tj68.onrender.com"
    ]
  }
})