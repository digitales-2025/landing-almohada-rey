import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import webpack from 'webpack';

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                hostname: 'res.cloudinary.com',
                protocol: 'https',
            },
            {
                hostname: 'images.pexels.com',
                protocol: 'https',
            },
        ],
    },
    //Configuración de webpack para la compilación de inversify
    webpack: (config, { isServer }) => {
        if (isServer) {
            config.plugins.push(
                new webpack.BannerPlugin({
                    // banner: 'require("reflect-metadata")',
                    banner: '/* eslint-disable */ try { require("reflect-metadata"); } catch(e) { console.error("Error loading reflect-metadata:", e); }',
                    raw: true,
                    entryOnly: true,
                })
            );
        }
        return config;
    },
    output: 'standalone',
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
};

const withNextIntl = createNextIntlPlugin({
    experimental: {
        // Provide the path to the messages that you're using in `AppConfig`
        createMessagesDeclaration: './messages/en.json',
    },
});
export default withNextIntl(nextConfig);
