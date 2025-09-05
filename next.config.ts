/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "res.cloudinary.com",
      "images.unsplash.com",
      "i.imgur.com",
      "images.pexels.com", // 👈 thêm dòng này
      "down-vn.img.susercontent.com",
    ],
  },
};

module.exports = nextConfig;
