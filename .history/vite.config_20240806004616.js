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
      build: {
      rollupOptions: {
        input: {
          client: 'src/client/index.html',
          admin: 'src/admin/index.html'
        },
        output: {
          dir: 'dist'
        },
      },
    },
    base: mode === "client" ? "/client/" : "/admin/", // Add this line
  };

  if (command === "serve" || command === "build") {
    if (mode === "client") {
      return {
        ...commonConfig,
        root: "client", // Ensure this points to the correct directory
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
        root: "admin", // Ensure this points to the correct directory
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
