import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

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
