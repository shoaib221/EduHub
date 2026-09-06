export default {
    routes: [
        {
            method: "GET",
            path: "/",
            handler: "auth.home",
            config: {
                auth: false,
            },
        },
        {
            method: "POST",
            path: "/auth/register",
            handler: "auth.register",
            config: {
                auth: false,
            },
        },
        {
            method: "POST",
            path: "/auth/login",
            handler: "auth.login",
            config: {
                auth: false,
            },
        },
        {
            method: "GET",
            path: "/auth/me",
            handler: "auth.me",
            config: {
                auth: false,
                middlewares: [
                    "global::auth",
                ],
            },
        },
        {
            method: "PATCH",
            path: "/auth/me",
            handler: "auth.me",
            config: {
                auth: false,
                middlewares: [
                    "global::auth",
                ],
            },
        },
        {
            method: "GET",
            path: "/auth/logout",
            handler: "auth.logout",
            config: {
                auth: false,
                middlewares: [
                    "global::auth",
                ],
            },
        },
    ],
};

