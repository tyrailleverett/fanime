/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ["via.placeholder.com", "cdn.myanimelist.net"]
    }
};

module.exports = nextConfig;
