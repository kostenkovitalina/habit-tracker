import { MetadataRoute } from 'next'

// robots
const robots = (): MetadataRoute.Robots => {
  return {
    rules: {
      userAgent: '*',
      // allow: '/',
      disallow: '*',
    },
  }
}

export default robots
