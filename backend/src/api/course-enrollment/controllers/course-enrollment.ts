import { ErrorProcessor } from "../../../lib/ErrorProcessor";

export default {


    async getEnrolledCourse(ctx: any) {

        try {

            const user = ctx.state.user;
            const { enrollmentId } = ctx.params;

            console.log("enrolledCourse");

            const enrollment = await strapi.db
                .query("api::course-enrollment.course-enrollment")
                .findOne({
                    where: {
                        id: Number(enrollmentId)
                    },
                    populate: {
                        course: true
                    }
                });

            const course = await strapi.db
                .query("api::course.course")
                .findOne({
                    where: {
                        id: enrollment.course.id
                    },
                    populate: {
                        lessons: true,
                        quizzes: true
                    }
                });

            const lessonData = await strapi
                .service("api::course-enrollment.course-enrollment")
                .getEnrolledLessons(strapi, enrollment, course);

            const quizData = await strapi
                .service("api::course-enrollment.course-enrollment")
                .getEnrolledQuizzes(strapi, enrollment, course);

            ctx.body = {
                course, ...lessonData, enrollment, ...quizData,
            }

        }
        catch (error: any) {
            return ctx.internalServerError(ErrorProcessor(error));
        }
    },

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

            const courses = enrollments;

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
            const { enrollmentId } = ctx.request.body;

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
                        id: Number(enrollmentId)
                    },
                });

            if (!lessonId || !enrollmentId) {
                throw new Error("Invalid lesson or enrollment")
            }

            const completedLessons = enrollment.completedLessons ?? {};

            completedLessons[lessson.id] = true;

            await strapi.db
                .query("api::course-enrollment.course-enrollment")
                .update({
                    where: {
                        id: Number(enrollmentId)
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

