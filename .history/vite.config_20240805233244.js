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
    if (mode === "user") {
      return {
        ...commonConfig,
        base: "/",
        server: {
          port: 80,
        },
      };
    }
    if (mode === "admin") {
      return {
        ...commonConfig,
        base: "/admin",
        server: {
          port: 8081,
        },
      };
    }
  }

  return {
    ...commonConfig,
    base: `${env.VITE_BASE_URL}`,
  };
});
