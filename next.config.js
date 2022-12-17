/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.cnn.com", "www.bbc.co.uk"],
  },
  experimental: {
    appDir: true,
  },
};
