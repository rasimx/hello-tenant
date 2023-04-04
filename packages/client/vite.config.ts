import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from "node:path";

const envDir = resolve(__dirname, '../../');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // envDir,
})
