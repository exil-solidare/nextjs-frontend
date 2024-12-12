import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://danswer.exil-solidaire.fr/api/:path*",
      },
    ];
  },
};

export default nextConfig;
