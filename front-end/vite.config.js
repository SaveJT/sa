import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})

// export default defineConfig({
//   server: {
//     proxy: {
//       'user': {
//         target: 'http://localhost:3000', // URL ของเซิร์ฟเวอร์ Node.js
//       },
//     },
//   })
