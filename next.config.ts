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
    //Configutacion de webpack para la compilacion de inversify
    webpack: (config, { isServer }) => {
        if (isServer) {
            config.plugins.push(
                new webpack.BannerPlugin({
                    banner: 'require("reflect-metadata")',
                    raw: true,
                    entryOnly: true,
                })
            );
        }
        return config;
    },
};

const withNextIntl = createNextIntlPlugin({
    experimental: {
        // Provide the path to the messages that you're using in `AppConfig`
        createMessagesDeclaration: './messages/en.json',
    },
});
export default withNextIntl(nextConfig);
