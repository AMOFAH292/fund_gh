import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwind from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwind()], // ✅ Keep Tailwind as a plugin
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // ✅ Set import alias
    },
  },
  server: {
    port: 3000, // Change if needed
  },
});
