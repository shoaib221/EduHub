
import { apiRoutes } from "../../../extra/apiRoutes";
import { ErrorProcessor } from "../../../lib/ErrorProcessor";
import { envVariables } from "../../../../config/environment_variables";

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

            const jwtToken =
                await strapi
                    .plugin("users-permissions")
                    .service("jwt")
                    .issue({
                        username: user.username,
                        email: user.email
                    });

            ctx.cookies.set("jwtAuthToken", jwtToken, {
                httpOnly: true,
                secure: envVariables.nodeEnv === "production",
                sameSite: "lax",
                maxAge: 7 * 24 * 60 * 60 * 1000,
                path: "/",
            });

            ctx.cookies.set("userRole", user.user_role, {
                httpOnly: true,
                secure: envVariables.nodeEnv === "production",
                sameSite: "lax",
                maxAge: 7 * 24 * 60 * 60 * 1000,
                path: "/",
            });

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

            console.log({
                protocol: ctx.protocol,
                secure: ctx.secure,
                forwarded: ctx.request.headers["x-forwarded-proto"],
                host: ctx.request.headers.host,
                nodeEnv: envVariables.nodeEnv
            });

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

            const jwtToken =
                await strapi
                    .plugin("users-permissions")
                    .service("jwt")
                    .issue({
                        email: user.email,
                        username: user.username
                    });

            ctx.cookies.set("jwtAuthToken", jwtToken, {
                httpOnly: true,
                secure: envVariables.nodeEnv === "production",
                sameSite: "lax",
                maxAge: 7 * 24 * 60 * 60 * 1000,
                path: "/",
            });

            ctx.cookies.set("userRole", user.user_role, {
                httpOnly: true,
                secure: envVariables.nodeEnv === "production",
                sameSite: "lax",
                maxAge: 7 * 24 * 60 * 60 * 1000,
                path: "/",
            });

            ctx.body = {
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

        const network = {
            protocol: ctx.protocol ?? "missing",
            secure: ctx.secure ?? "missing",
            forwarded: ctx.request.headers["x-forwarded-proto"] ?? "missing",
            host: ctx.request.headers.host ?? "missing",
            origin: ctx.request.origin ?? "missing",
        };

        ctx.body = {
            updated: true,
            message: "Welcome to Learing Management System",
            apiRoutes, envVariables, network
        };
    },

    async logout(ctx: any) {

        try {
            console.log("logout");

            ctx.cookies.set("jwtAuthToken", "", {
                httpOnly: true,
                secure: envVariables.nodeEnv === "production",
                sameSite: "lax",
                maxAge: 0,
                path: "/",
            });

            ctx.cookies.set("userRole", "", {
                httpOnly: true,
                secure: envVariables.nodeEnv === "production",
                sameSite: "lax",
                maxAge: 0,
                path: "/",
            });

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


