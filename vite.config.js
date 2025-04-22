import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
<<<<<<< HEAD
  plugins: [react(), tailwindcss()],
=======
  plugins: [react(),
    tailwindcss()
  ],
>>>>>>> d26d7410d8453dfbc7793308528b8d6c66974f73
})
