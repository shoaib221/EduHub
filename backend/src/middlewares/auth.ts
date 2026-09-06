import { ErrorProcessor } from "../lib/ErrorProcessor";

export default (config: any, { strapi }: any) => {

    return async (ctx: any, next: any) => {

        console.log("authMiddleware ", ctx.url);



        let token = ctx.cookies.get("jwtAuthToken");
        console.log("token", token)

        if (!token) {


            return ctx.unauthorized(
                "Missing authentication token ... ..."
            );
        }




        try {

            const payload =
                await strapi
                    .plugin("users-permissions")
                    .service("jwt")
                    .verify(token);

            console.log("payload", payload)
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
                return ctx.unauthorized(
                    "User not found"
                );
            }


            ctx.state.user = user;

            console.log("user ", user)



            await next();


        } catch (err) {

            return ctx.unauthorized(
                ErrorProcessor(err)
            );

        }

    };
};