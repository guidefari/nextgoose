const { withContentlayer } = require('next-contentlayer')

module.exports = withContentlayer({
  rewrites: async () => [
      {
        source: '/rss.xml',
        destination: '/api/rss',
      },
    ],

  images: {
    domains: [
      'i.scdn.co', // Spotify Album Art
      'mosaic.scdn.co', // Spofity playlist mosaics
      'pbs.twimg.com', // Twitter Profile Picture
      'res.cloudinary.com', // cloudinary images
    ],
  },
})
