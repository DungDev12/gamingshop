import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd());
  const commandConfig = {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };

  if (command == "serve" || "build") {
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
    ...commandConfig,
    base: `${env.VITE_BASE_URL}`,
  };
});
