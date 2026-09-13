import type { Core } from "@strapi/strapi";

export default {

	register({ strapi }: { strapi: Core.Strapi }) {

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