
// const { withSentryConfig } = require("@sentry/nextjs");
import createMDX from '@next/mdx'
import { withSentryConfig } from '@sentry/nextjs'

const basePath = process.env.BASE_PATH ?? ''

const hostnames = [
  '**.scdn.co', // Spofity playlist mosaics
  'pbs.twimg.com', // Twitter Profile Picture
  'res.cloudinary.com', // cloudinary images
  'images-ak.spotifycdn.com', // New spotify images url?
  'image-cdn-ak.spotifycdn.com',
  'd20tmfka7s58bt.cloudfront.net', // img-omg
  'spotifycdn.com',
  '**.spotifycdn.com'
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: {
      enabled: true,
    }
  },
  
  rewrites: async () => [
    {
      source: '/rss.xml',
      destination: '/api/rss',
    },
  ],

  images: {
    remotePatterns: hostnames.map(hostname => ({
      protocol: 'https',
      hostname
    }))
  },

  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
}

const withMDX = createMDX({
    experimental: {
        mdxRs: true,

    },
  
  // Add markdown plugins here, as desired
})

// export default withMDX(nextConfig)

// Injected content via Sentry wizard below
export default withSentryConfig(
  withMDX(nextConfig),
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    // Suppresses source map uploading logs during build
    silent: true,
    org: "goosebumps-collective",
    project: "goosebumps-collective",
  },
  {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: true,

    // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
    // This can increase your server load as well as your hosting bill.
    // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
    // side errors will fail.
    tunnelRoute: "/monitoring",

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,

    // Enables automatic instrumentation of Vercel Cron Monitors.
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,
  }
);
