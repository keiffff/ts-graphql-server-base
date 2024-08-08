import { defineConfig } from "vitest/config"

// biome-ignore lint/style/noDefaultExport: <explanation>
export default defineConfig({
  test: {
    globals: true,
    root: "./src",
  },
})
