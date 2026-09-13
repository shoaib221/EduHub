export default {



    async enrolledCourses(ctx: any) {

        try {

            const user = ctx.state.user;

            console.log("enrolledCourses", user);

            const enrollments = await strapi.db
                .query("api::course-enrollment.course-enrollment")
                .findMany({
                    where: {
                        student: {
                            id: user.id,
                        },
                    },

                    populate: {
                        course: true,
                    },
                });

            const courses = enrollments.map(elem => elem.course);

            ctx.body = {
                courses
            }

        }
        catch (error: any) {
            return ctx.internalServerError(error.message);
        }
    },

    async completeLesson(ctx: any) {

        try {

            const user = ctx.state.user;

            console.log("completeLesson", user);

            const { lessonId } = ctx.params;

            const lessson = await strapi.db
                .query("api::lesson.lesson")
                .findOne({
                    where: {
                        id: Number(lessonId)
                    },

                    populate: {
                        course: true,
                    },
                });

            const enrollment = await strapi.db
                .query("api::course-enrollment.course-enrollment")
                .findOne({
                    where: {
                        course: {
                            id: lessson.course.id
                        },

                        student: {
                            id: user.id
                        }
                    },


                });

            const completedLessons = enrollment.completedLessons ?? {};

            completedLessons[lessson.id] = true;

            await strapi.db
                .query("api::course-enrollment.course-enrollment")
                .update({
                    where: {
                        course: {
                            id: lessson.course.id
                        },

                        student: {
                            id: user.id
                        }
                    },

                    data: {
                        completedLessons,
                    },

                });

            ctx.body = {
                message: "marked successfully"
            }

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

