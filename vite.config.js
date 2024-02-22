import { defineConfig,loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/

export default defineConfig((command, mode) => {
    const env = loadEnv(mode, process.cwd(), '');
    const defaultConfig = {
        plugins: [react()],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
                '@@': path.resolve(__dirname, './public')
            }
        },
        server: {
            proxy: {
                '/api': {
                    target: env.VITE_API_URL,
                    changeOrigin: true, // 무슨뜻??
                    rewrite: path => path.replace(/^\/api/, '')
                }
            },
            configure: (proxy, _options) => {
                proxy.on('error', (err, _req, _res) => {
                    console.log('proxy error', err);
                });
                proxy.on('proxyReq', (proxyReq, req, _res) => {
                    console.log('Sending Request to the Target:', req.method, req.url);
                });
                proxy.on('proxyRes', (proxyRes, req, _res) => {
                    console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
                });
            },
        }
    };
    return defaultConfig;
})
