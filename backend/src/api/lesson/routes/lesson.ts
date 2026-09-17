export default {
    routes: [
        {
            method: "GET",
            path: "/course/:courseId/lessons",
            handler: "lesson.courseLessons",
            config: {
                auth: false,
                middlewares: [
                    "global::auth",
                ],
            },
        },
        {
            method: "POST",
            path: "/course/:courseId/lesson",
            handler: "lesson.createLesson",
            config: {
                auth: false,
                middlewares: [
                    "global::auth",
                ],
            },
        },
        {
            method: "DELETE",
            path: "/lesson/:lessonId",
            handler: "lesson.deleteLesson",
            config: {
                auth: false,
                middlewares: [
                    "global::auth",
                ],
            },
        },
        {
            method: "GET",
            path: "/lesson/:lessonId",
            handler: "lesson.getLesson",
            config: {
                auth: false,
                middlewares: [
                    "global::auth",
                ],
            },
        },
        {
            method: "GET",
            path: "/enrollment/:enrollmentId/lesson/:lessonId",
            handler: "lesson.getEnrolledLesson",
            config: {
                auth: false,
                middlewares: [
                    "global::auth",
                ],
            },
        },
        {
            method: "PATCH",
            path: "/lesson/:lessonId",
            handler: "lesson.updateLesson",
            config: {
                auth: false,
                middlewares: [
                    "global::auth",
                ],
            },
        },
    ],
};
