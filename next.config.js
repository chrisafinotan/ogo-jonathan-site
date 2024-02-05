/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
    images: {
        deviceSizes: [600, 640, 750, 828, 1080, 1200, 1920, 2048, 3840, 4000],
        imageSizes: [16, 32, 48, 64, 96, 128, 200, 256, 384, 400, 1050],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'firebasestorage.googleapis.com/**',
            },
            {
                protocol: 'http',
                hostname: '127.0.0.1/**',
            },
        ],
        minimumCacheTTL: 31536000,
    },
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback.fs = false;
            config.resolve.fallback.child_process = false;
            config.resolve.fallback.request = false;
            config.resolve.fallback.net = false;
            config.resolve.fallback.worker_threads = false;
            config.resolve.fallback.tls = false;
            config.resolve.fallback['text-decoding'] = false;
        }
        return config;
    },
};

module.exports = withBundleAnalyzer(nextConfig);
