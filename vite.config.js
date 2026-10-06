import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    historyApiFallback: true,
  },
  build: {
    rollupOptions: {
      external: ["chart.js/auto"],
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router", "react-router-dom", "react-redux", "@reduxjs/toolkit"],
          ui: ["react-icons", "react-toastify"],
        },
      },
    },
  },
});
