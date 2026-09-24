import type { Core } from "@strapi/strapi";

export default {

	register({ strapi }: { strapi: Core.Strapi }) {
		strapi.server.app.proxy = true;
	},


	bootstrap({ strapi }: { strapi: Core.Strapi }) {

		process.on(
			"uncaughtException",
			(err) => {
				console.error(
					"UNCAUGHT EXCEPTION:",
					err
				);
			}
		);


		process.on(
			"unhandledRejection",
			(err) => {
				console.error(
					"UNHANDLED REJECTION:",
					err
				);
			}
		);

	},

};

