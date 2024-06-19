/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Adicione esta linha
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;