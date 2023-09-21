import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { ViteMinifyPlugin } from 'vite-plugin-minify'

export default defineConfig({
  plugins: [
    react(),
    ViteMinifyPlugin({}),
  ],
  build: {
    outDir: "./public",
    minify: true, // Habilita la minificación de JS y CSS
    brotliSize: false, // Desactiva la compresión Brotli (opcional)
  },
});