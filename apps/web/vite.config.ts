import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import { VitePWA } from "vite-plugin-pwa";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
       // add this to cache all the imports
       workbox: {
        globPatterns: ["**/*"],
    },
    // add this to cache all the
    // static assets in the public folder
    includeAssets: [
        "**/*",
    ],
      manifest: {
        "theme_color": "#f69435",
        "background_color": "#f69435",
        "display": "standalone",
        "scope": "/",
        "start_url": "/",
        "short_name": "Malhuza",
        "description": "Malhuza Testing PWA",
        "name": "Malhuza",
        "icons": [
            {
                "src": "/logo_j.png",
                "sizes": "192x192",
                "type": "image/png",
                "purpose": "any"
            },
            {
                "src": "/logo_j_dark.png",
                "sizes": "256x256",
                "type": "image/png",
                "purpose": "maskable"
            },
            // {
            //     "src": "/icon-384x384.png",
            //     "sizes": "384x384",
            //     "type": "image/png"
            // },
            {
                "src": "/logo_j.png",
                "sizes": "512x512",
                "type": "image/png"
            },
        ],
        
    },
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000, // Change this to the desired port number
  },
})
