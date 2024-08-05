import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd());
  const commonConfig = {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };

  if (command === "serve" || command === "build") {
    if (mode === "client") {
      return {
        ...commonConfig,
        base: env.VITE_BASE_URL,
        root: path.resolve(__dirname, "client"),
        server: {
          port: env.VITE_BASE_PORT_CUSTOMER,
        },
        build: {
          outDir: path.resolve(__dirname, "dist/client"),
        },
      };
    }
    if (mode === "admin") {
      return {
        ...commonConfig,
        base: env.VITE_BASE_URL,
        root: path.resolve(__dirname, "admin"),
        server: {
          port: env.VITE_BASE_PORT_ADMIN,
        },
        build: {
          outDir: path.resolve(__dirname, "dist/admin"),
        },
      };
    }
  }

  return {
    ...commonConfig,
  };
});
