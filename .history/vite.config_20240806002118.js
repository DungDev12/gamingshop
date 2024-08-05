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
  };

  if (command === "serve" || command === "build") {
    if (mode === "client") {
      return {
        ...commonConfig,
        base: `${env.VITE_BASE_URL}`,
        build: {
          outDir: "dist/client",
        },
        server: {
          port: env.VITE_BASE_PORT_CUSTOMER,
        },
      };
    }
    if (mode === "admin") {
      return {
        ...commonConfig,
        base: `${env.VITE_BASE_URL}`,
        build: {
          outDir: "dist/admin",
        },
        server: {
          port: env.VITE_BASE_PORT_ADMIN,
        },
      };
    }
  }

  return {
    ...commonConfig,
  };
});
