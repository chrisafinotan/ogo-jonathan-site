module.exports = {
   images: {
      deviceSizes: [600, 640, 750, 828, 1080, 1200, 1920, 2048, 3840, 4000],
      imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
      remotePatterns: [
         {
            protocol: 'https',
            hostname: 'firebasestorage.googleapis.com/**',
         },
      ],
   },
};
