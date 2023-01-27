/** @type {import('next').NextConfig} */
const nextConfig = {
  // typescript: {
  //   ignoreBuildErrors: true,
  // },
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        port: "",
        hostname: "cdn.rawgit.com",
        pathname: "/akabab/superhero-api/0.2.0/api/images/**",
      },
    ],
  },
};

module.exports = nextConfig;
