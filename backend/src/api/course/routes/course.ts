export default {
    routes: [
        {
            method: "GET",
            path: "/instructed-courses",
            handler: "course.fetchInstructorCourses",
            config: {
                auth: false,
                middlewares: [
                    "global::auth",
                ],
            },
        },
        {
            method: "POST",
            path: "/course",
            handler: "course.createCourse",
            config: {
                auth: false,
                middlewares: [
                    "global::auth",
                ],
            },
        },
        {
            method: "GET",
            path: "/course/:courseId",
            handler: "course.getCourse",
            config: {
                auth: false,
            },
        },
        {
            method: "GET",
            path: "/courses",
            handler: "course.fetchCourses",
            config: {
                auth: false,
            },
        },
        {
            method: "GET",
            path: "/course-analytics/:courseId",
            handler: "course.courseAnalytics",
            config: {
                auth: false,
                middlewares: [
                    "global::auth",
                ],
            },
        },
    ],
};

