module.exports = {
   env: {
		FIREBASE_PROJECT_ID: 'next-ogo-jonathan',
	},
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
   compiler: {
     // see https://styled-components.com/docs/tooling#babel-plugin for more info on the options.
     styledComponents: {
       displayName: true,
     },
   },
 }
