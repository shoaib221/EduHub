import type { Core } from '@strapi/strapi';

const allowedMediaTypes = [
	'image/*',
	'video/*',
	'audio/*',
	'application/pdf',
	'application/msword',
	'application/vnd.openxmlformats-officedocument.*',
	'text/plain',
	'text/csv',
];

const deniedExecutableTypes = [
	'application/vnd.microsoft.portable-executable',
	'application/x-msdownload',
	'application/x-msdos-program',
	'application/x-executable',
	'application/x-dosexec',
	'application/x-sh',
	'text/x-shellscript',
	'application/x-mach-binary',
];

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Plugin => ({
	'users-permissions': {
		config: {
			jwtManagement: 'legacy',
			jwtSecret: env("JWT_SECRET"),
			jwt: {
				expiresIn: "7d",

			},
		},
	},
	upload: {
		config: {
			provider: "cloudinary",
			providerOptions: {
				cloud_name: env("CLOUDINARY_CLOUD_NAME"),
				api_key: env("CLOUDINARY_API_KEY"),
				api_secret: env("CLOUDINARY_API_SECRET"),
			},
		},
	},
});

export default config;
