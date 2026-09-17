import type { Core } from '@strapi/strapi';
import { envVariables } from './environment_variables';

export default ({ env }: Core.Config.Shared.ConfigParams) => ({
	host: envVariables.host,
	port: envVariables.port,
	proxy: true,
	url: envVariables.publicUrl,
	app: {
		keys: envVariables.appKeys,
	},
});



