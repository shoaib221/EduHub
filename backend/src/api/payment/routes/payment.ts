export default {
    routes: [
        {
            method: "POST",
            path: "/payment/create-stripe-session",
            handler: "payment.createStripeSession",
            config: {
                auth: false,
                middlewares: [
                    "global::auth",
                ],
            },
        },
        {
            method: "POST",
            path: "/payment/verify",
            handler: "payment.paymentVerify",
            config: {
                auth: false,
                middlewares: [
                    "global::auth",
                ],
            },
        },
    ],
};
