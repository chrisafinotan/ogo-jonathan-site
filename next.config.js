/** @type {import('next').NextConfig} */

const STORE_ID = process.env.BLOB_READ_WRITE_TOKEN?.match(
    /^vercel_blob_rw_([a-z0-9]+)_[a-z0-9]+$/i
)?.[1].toLowerCase();

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
                hostname: `${STORE_ID}.public.blob.vercel-storage.com`,
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'firebasestorage.googleapis.com/**',
            },
        ],
        minimumCacheTTL: 31536000,
    },
    experimental: {
        serverActions: true,
    },
};

module.exports = withBundleAnalyzer(nextConfig);
