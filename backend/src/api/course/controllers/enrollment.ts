export default {

    async enroll(ctx: any) {

        try {
            const user = ctx.state.user;

            if (!user) {
                return ctx.unauthorized("Authentication required.");
            }

            if (user.user_role !== "student") {
                return ctx.unauthorized("Unauthorized action");
            }

            const { courseId } = ctx.params;

            if (!courseId) {
                return ctx.badRequest("courseId is required.");
            }

            // Check course exists
            const course = await strapi.db
                .query("api::course.course")
                .findOne({
                    where: {
                        id: courseId,
                    },
                });

            if (!course) {
                return ctx.notFound("Course not found.");
            }

            const updatedUser = await strapi.db
                .query("plugin::users-permissions.user")
                .update({
                    where: {
                        id: user.id,
                    },
                    data: {
                        enrolled_courses: {
                            connect: [courseId],
                        },
                    },
                });

            ctx.body = {
                message: "Course enrolled successfully.",
            };

        }
        catch (error: any) {
            return ctx.internalServerError(error.message);
        }
    },

    async enrolledCourses(ctx: any) {

        try {

            const user = ctx.state.user;

            console.log("enrolledCourses", user);

            if (!user) {
                return ctx.unauthorized("Authentication required.");
            }

            // console.log("enroll", user)

            if (user.user_role !== "student") {
                return ctx.unauthorized("Unauthorized action");
            }

            const currentUser = await strapi.db
                .query("plugin::users-permissions.user")
                .findOne({
                    where: {
                        id: user.id,
                    },
                    populate: {
                        enrolled_courses: true,
                    },
                });

            ctx.body = {
                message: "Student enrolled successfully.",
                courses: currentUser.enrolled_courses
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

