import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { defineConfig, Plugin } from 'vite';

// Plugin to duplicate index.html to 404.html for static SPA hosting fallbacks
function spa404Plugin(): Plugin {
  return {
    name: 'spa-404-fallback',
    closeBundle() {
      try {
        const rootDir = import.meta.dirname || process.cwd();
        const distDir = path.resolve(rootDir, 'dist');
        const indexPath = path.join(distDir, 'index.html');
        const notFoundPath = path.join(distDir, '404.html');
        if (fs.existsSync(indexPath)) {
          fs.copyFileSync(indexPath, notFoundPath);
        }
      } catch (err) {
        console.warn('Could not copy index.html to 404.html:', err);
      }
    }
  };
}

export default defineConfig(() => {
  const rootDir = import.meta.dirname || process.cwd();
  return {
    plugins: [react(), tailwindcss(), spa404Plugin()],
    resolve: {
      alias: {
        '@': path.resolve(rootDir, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
