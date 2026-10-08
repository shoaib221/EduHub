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
        {
            method: "POST",
            path: "/auth/send-verification-email",
            handler: "auth.logout",
            config: {
                auth: false,

            },
        },
        {
            method: "GET",
            path: "/auth/verify-email",
            handler: "auth.logout",
            config: {
                auth: false,

            },
        },
        {
            method: "POST",
            path: "/auth/forgot-password",
            handler: "auth.logout",
            config: {
                auth: false,
            },
        },
        {
            method: "POST",
            path: "/auth/reset-password",
            handler: "auth.logout",
            config: {
                auth: false,
            },
        },
        {
            method: "GET",
            path: "/test-endpoint",
            handler: "auth.testEndpoint",
            config: {
                auth: false,
            },
        },
        {
            method: "GET",
            path: "/test-protected-endpoint",
            handler: "auth.testEndpoint",
            config: {
                auth: false,
                middlewares: [
                    "global::auth",
                ],
            },
        },
    ],
};

