import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

export default defineConfig({
  base: './',
  plugins: [inspectAttr(), react()],
  resolve: {
    alias: {
      // Esta es la forma más segura de definir el alias @
      "@": path.resolve(new URL('.', import.meta.url).pathname, "./src"),
    },
  },
});
