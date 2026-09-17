export default {

    async getCourse(ctx: any) {
        try {
            console.log("get course");

            const { courseId } = ctx.params;

            const course = await strapi.db
                .query("api::course.course")
                .findOne({
                    where: {
                        id: Number(courseId)
                    },
                    populate: {
                        instructor: true,
                        lessons: true,
                        quizzes: true
                    },
                });

            ctx.body = {
                course
            }
        }
        catch (err) {

        }
    },

    async fetchCourses(ctx: any) {
        try {
            console.log("enrolledCourses");
            const user = ctx.state.user;

            const courses = await strapi.db
                .query("api::course.course")
                .findMany({
                    populate: {
                        instructor: true,
                    },
                });


            ctx.body = {
                message: "Student enrolled successfully.",
                courses
            };

        }
        catch (error: any) {
            return ctx.internalServerError(error.message);
        }
    },

    async fetchInstructorCourses(ctx: any) {

        try {

            console.log("fetchInstructorCourses");
            const user = ctx.state.user;

            if (user.user_role === "student") {
                throw new Error("Unauthorized action")
            }

            const courses = await strapi.db
                .query("api::course.course")
                .findMany({
                    where: {
                        instructor: {
                            id: user.id,
                        },
                    },
                    populate: {
                        instructor: true
                    },
                });


            ctx.body = {
                courses
            };
        }
        catch (error: any) {
            return ctx.internalServerError(error.message);
        }
    },

    async createCourse(ctx: any) {

        try {
            console.log("createCourse");
            const user = ctx.state.user;

            if (!user || user.user_role === "student") {
                return ctx.unauthorized("Unauthorized action.");
            }

            const { title, description, price, category, coverImage } = ctx.request.body;

            if (!title) {
                return ctx.badRequest("Title is required.");
            }

            const today = new Date().toISOString().split("T")[0];
            const course = await strapi.db
                .query("api::course.course")
                .create({
                    data: {
                        title,
                        description,
                        instructor: user.id,
                        price, category, coverImage,
                        published: today
                    },
                });

            ctx.body = {
                message: "Course created successfully.",
                course
            };
        }
        catch (error: any) {
            return ctx.internalServerError(error.message);
        }

    },

    async courseAnalytics(ctx: any) {

        try {
            console.log("course analytics");
            const user = ctx.state.user;



            if (user.user_role === "student") {
                return ctx.unauthorized("Unauthorized action.");
            }


            const { courseId } = ctx.params;




            const course = await strapi.db
                .query("api::course.course")
                .findOne({
                    where: {
                        id: Number(courseId),
                    }
                });

            const data = await strapi
                .service("api::course.course")
                .courseInstructorAnalytics(strapi, course);

            console.log(data)


            ctx.body = {
                message: "Course Analytics",
                ...data
            };
        }
        catch (error: any) {
            return ctx.internalServerError(error.message);
        }

    },

    async test(ctx: any) {
        console.log("test");
        const user = ctx.state.user;

        ctx.body = {
            message: "Test",
            user
        };
    },
};

