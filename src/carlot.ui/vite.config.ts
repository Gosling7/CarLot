import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    host: true,
    // Bind-mounted sources on Windows don't emit file events inside a Linux container
    watch: process.env.VITE_USE_POLLING ? { usePolling: true } : undefined,
    proxy: {
      "/api": {
        target: process.env.API_PROXY_TARGET ?? "http://localhost:5000",
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
});
