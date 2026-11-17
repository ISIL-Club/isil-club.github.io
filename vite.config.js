import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig(({ command, isPreview }) => ({
  plugins: [react()],
  base: command === "serve" && !isPreview ? "/" : "/landing-page/",
  build: {
    outDir: "./docs",
  },
}));
