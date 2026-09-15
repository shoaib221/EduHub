

import { ErrorProcessor } from "../lib/ErrorProcessor";

export default (config: any, { strapi }: any) => {

    return async (ctx: any, next: any) => {
        console.log("authMiddleware ", ctx.url);

        try {
            let token = ctx.cookies.get("jwtAuthToken");
            // console.log("cookies", ctx.cookies);

            if (!token) {
                throw new Error(
                    "Missing authentication token ... ..."
                );
            }

            const payload =
                await strapi
                    .plugin("users-permissions")
                    .service("jwt")
                    .verify(token);

            // console.log("payload", payload)
            const user =
                await strapi
                    .query(
                        "plugin::users-permissions.user"
                    )
                    .findOne({
                        where: {
                            email: payload.email
                        },
                    });

            if (!user) {
                throw new Error(
                    "User not found"
                );
            }

            ctx.state.user = user;
            // console.log("user ", user)
            await next();

        } catch (err) {
            ctx.cookies.set("jwtAuthToken", "", {
                httpOnly: true,
                maxAge: 0,
                sameSite: "lax",
                secure: process.env.NODE_ENV === "production",
            });

            ctx.cookies.set("userRole", "", {
                httpOnly: true,
                maxAge: 0,
                sameSite: "lax",
                secure: process.env.NODE_ENV === "production",
            });

            return ctx.unauthorized(
                ErrorProcessor(err)
            );

        }

    };
};