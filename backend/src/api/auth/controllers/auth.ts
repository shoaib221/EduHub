
import { apiRoutes } from "../../../extra/apiRoutes";
import { ErrorProcessor } from "../../../lib/ErrorProcessor";

export default {

    async register(ctx: any) {

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
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: "/",
        });

        ctx.body = {
            message: "Registered successfully",
            user,
        };
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
            }

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
                secure: process.env.NODE_ENV === "production",
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

        ctx.body = {
            message: "Welcome to Learing Management System",
            apiRoutes
        };
    },

    async logout(ctx: any) {

        try {
            console.log("logout");

            ctx.cookies.set("jwtAuthToken", null, {
                httpOnly: true,
                expires: new Date(0),
                sameSite: "lax",
                secure: process.env.NODE_ENV === "production",
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


