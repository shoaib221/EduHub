import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	productionBrowserSourceMaps: true,
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
			{
				protocol: "https",
				hostname: "www.teachpeak.in"
			},
			{
				protocol: "https",
				hostname: "news.mit.edu"
			},
			{
				protocol: "https",
				hostname: "img.magnific.com"
			},
			{
				protocol: "https",
				hostname: "miro.medium.com"
			},
			{
				protocol: "https",
				hostname: "media.licdn.com"
			},
		],
	},
};



export default nextConfig;