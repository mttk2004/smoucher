import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), tsconfigPaths()],
  test: {
    environment: "jsdom",
    environmentOptions: {
      jsdom: {
        resources: "usable",
      },
    },
    setupFiles: ["./app/setupTests.ts"],
    globals: true,
  },
});
