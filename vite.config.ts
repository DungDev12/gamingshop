import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  base: "/gamingshop",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@routes": path.resolve(__dirname, "./src/routes"),
      "@Pages": path.resolve(__dirname, "./src/Pages"),
      "@Desktop": path.resolve(__dirname, "./src/Pages/Desktop"),
      "@Mobile": path.resolve(__dirname, "./src/Pages/Mobile"),
    },
  },
});
