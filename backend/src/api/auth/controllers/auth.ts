
import { apiRoutes } from "../../../extra/apiRoutes";
import { ErrorProcessor } from "../../../lib/ErrorProcessor";
import { envVariables } from "../../../../config/environment_variables";
import { SetHttpCookie } from "../../../lib/SetHttpCookie";
import { JwtTokenGenerate } from "../../../lib/JwtToken";

export default {

    async register(ctx: any) {

        try {

            const {
                username,
                email,
                password,
                user_role
            } = ctx.request.body;

            if (!username || !email || !password || !user_role) {
                return ctx.badRequest(
                    "username, email, password and user_role required"
                );
            }

            const existingUser = await strapi
                .query("plugin::users-permissions.user")
                .findOne({
                    where: {
                        email,
                    },
                });

            if (existingUser) {
                return ctx.badRequest(
                    "Email already exists"
                );
            }

            const user = await strapi
                .plugin("users-permissions")
                .service("user")
                .add({
                    username,
                    email,
                    password,
                    user_role,
                    confirmed: true,
                    blocked: false,
                });

            const jwtToken = await JwtTokenGenerate(strapi, {
                email: user.email,
                username: user.username
            })

            SetHttpCookie(ctx, 7, "jwtAuthToken", jwtToken)

            ctx.body = {
                message: "Registered successfully",
                user,
            };

        } catch (error) {
            return ctx.InternalServerError(ErrorProcessor(error))
        }
    },

    async login(ctx: any) {

        try {
            console.log("login");

            const {
                email,
                password,
            } = ctx.request.body;

            const user = await strapi
                .query("plugin::users-permissions.user")
                .findOne({
                    where: {
                        email,
                    },
                });

            if (!user) {
                return ctx.badRequest(
                    "Invalid email"
                );
            };

            const validPassword =
                await strapi
                    .plugin("users-permissions")
                    .service("user")
                    .validatePassword(
                        password,
                        user.password
                    );

            if (!validPassword) {
                return ctx.badRequest(
                    "Invalid password"
                );
            }

            const jwtToken = await JwtTokenGenerate(strapi, {
                email: user.email,
                username: user.username
            })

            SetHttpCookie(ctx, 7, "jwtAuthToken", jwtToken)

            ctx.body = {
                message: "logged in successfully",
                user
            };
        }
        catch (error) {
            return ctx.internalServerError(
                ErrorProcessor((error))
            );
        }
    },

    async me(ctx: any) {

        ctx.body = {
            user: ctx.state.user,
        };

    },

    async updateMe(ctx: any) {

        try {
            const user = ctx.state.user;

            const updation = ctx.request.body;


            const updatedUser = await strapi
                .query(
                    "plugin::users-permissions.user"
                )
                .update({
                    where: {
                        id: user.id,
                    },

                    data: {
                        ...updation
                    },

                    populate: [
                        "role",
                    ],
                });


            ctx.body = {
                message: "Profile updated successfully",
                user: updatedUser,
            };


        } catch (err) {
            return ctx.internalServerError(
                ErrorProcessor(err)
            );

        }

    },

    async home(ctx: any) {
        console.log(strapi.config.get("server"));

        const network = {
            protocol: ctx.protocol ?? "missing",
            secure: ctx.secure ?? "missing",
            forwarded: ctx.request.headers["x-forwarded-proto"] ?? "missing",
            host: ctx.request.headers.host ?? "missing",
            origin: ctx.request.origin ?? "missing",
            socketEncrypted: !!(ctx.socket.encrypted ?? false),
            proxy: strapi.config.get("server.proxy"),
            koa_proxy: strapi.server.app.proxy,
            PUBLIC_URL: envVariables.publicUrl,
            headers: {
                "x-forwarded-proto": ctx.headers["x-forwarded-proto"],
                "x-forwarded-host": ctx.headers["x-forwarded-host"],
            },
        };

        ctx.body = {
            updated: true,
            message: "Welcome to Learing Management System",
            apiRoutes, network
        };
    },

    async logout(ctx: any) {

        try {
            console.log("logout");

            SetHttpCookie(ctx, 0, "jwtAuthToken", null);

            ctx.body = {
                message: "logged out successfully"
            };
        }
        catch (error) {
            return ctx.internalServerError(
                ErrorProcessor((error))
            );
        }
    },
};


