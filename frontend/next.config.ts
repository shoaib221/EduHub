import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "images.unsplash.com",
			},
			{
				protocol: "https",
				hostname: "encrypted-tbn0.gstatic.com",
			},
			{
				protocol: "https",
				hostname: "www.zero2lab.com"
			},
			{
				protocol: "https",
				hostname: "www.jvbruni.com"
			},
			{
				protocol: "https",
				hostname: "wp.sfdcdigital.com"
			},

		],
	},
};

export default nextConfig;