export default {
    routes: [
        {
            method: "POST",
            path: "/course/:courseId/enroll",
            handler: "enrollment.enroll",
            config: {
                auth: false,
                middlewares: [
                    "global::auth",
                ],
            },
        },
        {
            method: "GET",
            path: "/enrolled-courses",
            handler: "enrollment.enrolledCourses",
            config: {
                auth: false,
                middlewares: [
                    "global::auth",
                ],
            },
        },
    ],
};



