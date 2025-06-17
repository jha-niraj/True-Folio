import type { NextConfig } from "next";

// @ts-ignore
import { PrismaPlugin } from '@prisma/nextjs-monorepo-workaround-plugin'

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "ui-avatars.com",
			},
			{
				protocol: "https",
				hostname: "lh3.googleusercontent.com",
			},
			{
				protocol: "https",
				hostname: "img.clerk.com",
			},
		],
	},
	webpack: (config, { isServer }) => {
		if (isServer) {
			config.plugins = [...config.plugins, new PrismaPlugin()]
		}
		return config
	},
	experimental: {
		serverComponentsExternalPackages: ['@prisma/client', 'prisma'],
	},
	eslint: {
		ignoreDuringBuilds: false,
		dirs: ['pages', 'app', 'components', 'lib'],
	}
};

export default nextConfig;