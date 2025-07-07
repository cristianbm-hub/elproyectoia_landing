import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Optimización para Core Web Vitals
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: false,
    rollupOptions: {
      output: {
        // Code splitting optimizado
        manualChunks: {
          // Vendor chunk para librerías principales
          vendor: ['react', 'react-dom'],
          // Chunk separado para Lucide React icons
          icons: ['lucide-react'],
          // Chunk para PocketBase
          api: ['pocketbase']
        },
        // Optimización de nombres de archivos para caché
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId 
            ? chunkInfo.facadeModuleId.split('/').pop() 
            : 'chunk';
          return `js/${facadeModuleId}-[hash].js`;
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'css/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    },
    // Optimización de tamaño de chunks
    chunkSizeWarningLimit: 500,
    // Compresión mejorada
    reportCompressedSize: true
  },
  server: {
    host: true,
    port: 5173,
    watch: {
      usePolling: true
    }
  },
  // Optimización de dependencias
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'lucide-react'
    ],
    exclude: []
  },
  // Eliminación de console.log en producción
  esbuild: {
    drop: ['console', 'debugger']
  }
});
