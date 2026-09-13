import { ErrorProcessor } from "../lib/ErrorProcessor";

export default (config: any, { strapi }: any) => {

    return async (ctx: any, next: any) => {
        console.log("authStudentMiddleware ", ctx.url);

        try {
            const user = ctx.state.user;

            if (!user) {
                return ctx.unauthorized(
                    "User not found"
                );
            }

            if (user.user_role !== 'student') {
                return ctx.unauthorized(
                    "Unauthorized action"
                );
            }

            await next();

        } catch (err) {

            return ctx.unauthorized(
                ErrorProcessor(err)
            );

        }

    };
};