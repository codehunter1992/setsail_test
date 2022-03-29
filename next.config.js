/** @type {import('next').NextConfig} */
const withLess = require("next-with-less");

const nextConfig = {
  reactStrictMode: true,
  lessLoaderOptions: {},
  async rewrites() {
    return [
      {
          source: "/",
          destination: "/price"
      }
  ]
}
}

module.exports = withLess(nextConfig)
