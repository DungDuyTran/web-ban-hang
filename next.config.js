/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // dùng next export
  images: {
    unoptimized: true, // GitHub Pages không support image optimization
  },
  basePath: "/web-ban-hang", // tên repo GitHub của bạn
  assetPrefix: "/web-ban-hang/",
};

module.exports = nextConfig;
