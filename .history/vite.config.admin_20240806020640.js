import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd());
  const commonConfig = {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      port: env.VITE_BASE_PORT_ADMIN || 8081,
    },
    base: env.VITE_BASE_URL || "/gamingshop",
    build: {
      outDir: "dist/admin",
    },
  };

  return {
    ...commonConfig,
  };
});
