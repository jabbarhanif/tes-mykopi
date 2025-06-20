import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
    // --- TAMBAHKAN BLOK INI ---
    server: {
        host: '192.168.1.4',
        port: 5175,
    },
    resolve: {
        alias: {
            '@assets': path.resolve(__dirname, 'public'),
        },
    },
});
