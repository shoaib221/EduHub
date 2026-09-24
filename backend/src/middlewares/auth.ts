

import { ErrorProcessor } from "../lib/ErrorProcessor";
import { JwtTokenValidate } from "../lib/JwtToken";
import { GetHttpCookie, SetHttpCookie } from "../lib/SetHttpCookie";

export default (config: any, { strapi }: any) => {

    return async (ctx: any, next: any) => {
        console.log("authMiddleware ", ctx.url);

        try {
            let token = GetHttpCookie(ctx, "jwtAuthToken");

            console.log("jwtAuthToken", token);

            let userPayload = await JwtTokenValidate(strapi, token)

            if (!userPayload) {
                throw new Error("Authentication token missing");
            }

            // console.log("payload", payload)
            const user =
                await strapi
                    .query(
                        "plugin::users-permissions.user"
                    )
                    .findOne({
                        where: {
                            email: userPayload.email
                        },
                    });

            if (!user) {
                throw new Error(
                    "User not found"
                );
            }

            ctx.state.user = user;
            await next();

        } catch (err) {


            SetHttpCookie(ctx, 0, "jwtAuthToken", null);

            return ctx.unauthorized(
                ErrorProcessor(err)
            );

        }

    };
};