import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from "vite-plugin-svgr";
import * as path from 'path'
import {ViteEjsPlugin} from "vite-plugin-ejs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr(), react(), ViteEjsPlugin((viteConfig) => {
    // console.log("vite",viteConfig)
    // viteConfig is the current viteResolved config.
    return {
      title: viteConfig.env.VITE_PROJECT_HEAD,
      head:viteConfig.env.VITE_TENANT_NAME,
    }
  })],
  build: {
    sourcemap: true,
  },
  resolve: {
    alias: [
            { find: '@/src', replacement: path.resolve(__dirname, 'src') },
            { find: '@components', replacement: path.resolve(__dirname, 'src/components') },
            { find: '@hooks', replacement: path.resolve(__dirname, 'src/hooks') },
            { find: '@store', replacement: path.resolve(__dirname, 'src/store') },
            { find: '@utilities', replacement: path.resolve(__dirname, 'src/utilities') },
            { find: '@api', replacement: path.resolve(__dirname, 'src/api') },
           ],
  },
});
