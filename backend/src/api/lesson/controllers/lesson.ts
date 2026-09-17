import { CourseEnrollment } from "../../../../types/courseEnrollment";
import { Lesson } from "../../../../types/lesson";
import { ErrorProcessor } from "../../../lib/ErrorProcessor";

export default {


    async courseLessons(ctx: any) {

        try {
            console.log("courseLessons");
            const user = ctx.state.user;

            const { courseId } = ctx.params

            const course = await strapi.db
                .query("api::course.course")
                .findMany({
                    where: {

                        id: Number(courseId),

                    }
                });

            const lessons = await strapi.db
                .query("api::lesson.lesson")
                .findMany({
                    where: {
                        course: {
                            id: Number(courseId),
                        },
                    },
                    orderBy: {
                        order: "asc",
                    },
                });

            ctx.body = {
                course,
                lessons
            }

        }
        catch (error: any) {
            return ctx.internalServerError(error.message);
        }
    },

    async createLesson(ctx: any) {

        try {

            console.log("createLesson");
            const user = ctx.state.user;

            if (user.user_role === "student") {
                throw new Error("Unauthorized action")
            }

            const { courseId } = ctx.params;

            const course = await strapi.db
                .query("api::course.course")
                .findOne({
                    where: {
                        id: Number(courseId),
                        instructor: {
                            id: user.id,
                        },
                    },
                });

            if (!course) {
                return ctx.notFound("Course not found or you are not its instructor.");
            }

            const {
                title, content, videoURL, order
            } = ctx.request.body;

            console.log("body", ctx.request.body)

            if (!title || !content || !videoURL) {
                return ctx.badRequest("Invalid request body.");
            }

            const lesson = await strapi.db
                .query("api::lesson.lesson")
                .create({
                    data: {
                        title,
                        content,
                        videoURL,
                        course: courseId, // numeric database id
                    },
                });


            ctx.body = {
                lesson
            };
        }
        catch (error: any) {
            return ctx.internalServerError(ErrorProcessor(error));
        }
    },

    async getLesson(ctx: any) {

        try {

            console.log("getLesson");
            const user = ctx.state.user;

            const { lessonId } = ctx.params;

            const lesson = await strapi.db
                .query("api::lesson.lesson")
                .findOne({
                    where: {
                        id: Number(lessonId)
                    }
                });

            if (!lesson) {
                return ctx.notFound("Lesson not found.");
            }

            ctx.body = {
                lesson
            };
        }
        catch (error: any) {
            return ctx.internalServerError(error.message);
        }
    },


    async getEnrolledLesson(ctx: any) {

        try {

            console.log("getLesson");
            const user = ctx.state.user;

            const { lessonId, enrollmentId } = ctx.params;

            const lesson: any = await strapi.db
                .query("api::lesson.lesson")
                .findOne({
                    where: {
                        id: Number(lessonId)
                    }
                });

            const enrollment: CourseEnrollment = await strapi.db.query("api::course-enrollment.course-enrollment")
                .findOne({
                    where: {
                        id: Number(enrollmentId)
                    }
                })

            if (!lesson || !enrollment || !enrollment.completedLessons) {
                return ctx.notFound("Lesson not found.");
            }

            lesson["completed"] = enrollment.completedLessons[lesson.id]

            ctx.body = {
                lesson
            };
        }
        catch (error: any) {
            return ctx.internalServerError(error.message);
        }
    },


    async deleteLesson(ctx: any) {

        try {
            console.log("deleteLesson");
            const user = ctx.state.user;

            const { lessonId } = ctx.params;

            const lesson = await strapi.db
                .query("api::lesson.lesson")
                .findOne({
                    where: {
                        id: Number(lessonId)
                    }
                });

            if (!lesson) {
                return ctx.notFound("No such lesson.");
            }

            const deletedLesson = await strapi.db
                .query("api::lesson.lesson")
                .delete({
                    where: {
                        id: Number(lessonId)
                    },
                });



            ctx.body = {
                deletedLesson
            };
        }
        catch (error: any) {
            return ctx.internalServerError(error.message);
        }
    },

    async updateLesson(ctx: any) {

        try {

            console.log("updateLesson");

            const user = ctx.state.user;

            const { lessonId } = ctx.params;

            const lesson = await strapi.db
                .query("api::lesson.lesson")
                .findOne({
                    where: {
                        id: Number(lessonId)
                    },
                });

            if (!lesson) {
                return ctx.notFound("No such lesson.");
            }

            const updation = ctx.request.body;

            console.log(updation)

            const updatedLesson = await strapi.db
                .query("api::lesson.lesson")
                .update({
                    where: {
                        id: Number(lessonId)
                    },
                    data: {
                        ...updation
                    },
                });

            ctx.body = {
                updatedLesson
            };

        }
        catch (error: any) {
            return ctx.internalServerError(error.message);
        }
    },
};

