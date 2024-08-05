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
      port: env.VITE_BASE_PORT_CUSTOMER,
    },
    base: env.VITE_BASE_URL,
    build: {
      outDir: "dist/client",
    },
  };

  return {
    ...commonConfig,
  };
});
