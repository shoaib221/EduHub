export default {
    routes: [
        {
            method: "GET",
            path: "/enrolled-courses",
            handler: "course-enrollment.enrolledCourses",
            config: {
                auth: false,
                middlewares: [
                    "global::auth",
                    "global::authStudent"
                ],
            },
        },
        {
            method: "GET",
            path: "/enrolled-course/:enrollmentId",
            handler: "course-enrollment.getEnrolledCourse",
            config: {
                auth: false,
                middlewares: [
                    "global::auth"
                ],
            },
        },
        {
            method: "POST",
            path: "/complete-lesson/:lessonId",
            handler: "course-enrollment.completeLesson",
            config: {
                auth: false,
                middlewares: [
                    "global::auth",
                    "global::authStudent"
                ],
            },
        },
    ],
};