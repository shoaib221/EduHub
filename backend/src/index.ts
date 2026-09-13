export default {
  register({ strapi }) { },

  bootstrap({ strapi }) {
    process.on("uncaughtException", (err) => {
      console.error(
        "UNCAUGHT EXCEPTION:",
        err
      );
    });

    process.on("unhandledRejection", (err) => {
      console.error(
        "UNHANDLED REJECTION:",
        err
      );
    });
  },
};