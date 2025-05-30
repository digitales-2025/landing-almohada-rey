import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import webpack from 'webpack';

const nextConfig: NextConfig = {
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

    webpack: (config, { isServer }) => {
        if (isServer) {
            config.plugins.push(
                new webpack.BannerPlugin({
                    banner: 'require("reflect-metadata");',
                    raw: true,
                    entryOnly: false,
                })
            );
        }
        return config;
    },

    // Nueva configuración crítica para Edge Runtime
    experimental: {
        serverComponentsExternalPackages: ['reflect-metadata'],
    },

    // Configuración existente
    output: 'standalone',
    eslint: {
        ignoreDuringBuilds: true,
    },
};

const withNextIntl = createNextIntlPlugin({
    experimental: {
        createMessagesDeclaration: './messages/en.json',
    },
});

export default withNextIntl(nextConfig);
