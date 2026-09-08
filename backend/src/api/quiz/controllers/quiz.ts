import { ErrorProcessor } from "../../../lib/ErrorProcessor";


export default {

    async createQuiz(ctx: any) {

        try {
            console.log("createCourse");
            const user = ctx.state.user;

            const { title, description, courseId } = ctx.request.body;

            // Check that the course exists
            const course = await strapi.db
                .query("api::course.course")
                .findOne({
                    where: {
                        id: Number(courseId),
                        instructor: {
                            id: user.id
                        }
                    },
                });

            if (!course) {
                return ctx.notFound("Course not found.");
            }

            // Create the quiz
            const quiz = await strapi.db
                .query("api::quiz.quiz")
                .create({
                    data: {
                        title,
                        description,
                        course: course.id,
                    },
                });

            ctx.body = {
                quiz
            };
        }
        catch (error: any) {
            return ctx.internalServerError(error.message);
        }
    },

    async getQuiz(ctx: any) {

        try {
            console.log("getQuiz");
            const user = ctx.state.user;

            const { quizId } = ctx.params;


            const quiz = await strapi.db
                .query("api::quiz.quiz")
                .findOne({
                    where: {
                        id: Number(quizId),
                    }
                });

            const questions = await strapi.db
                .query("api::question.question")
                .findMany({
                    where: {
                        quiz: {
                            id: Number(quizId)
                        }
                    },
                    orderBy: {
                        id: "asc"
                    }

                });

            if (!quiz) {
                return ctx.notFound("Quiz not found.");
            }

            quiz["questions"] = questions;

            ctx.body = {
                quiz
            };
        }
        catch (error: any) {

            return ctx.internalServerError(ErrorProcessor(error));
        }
    },

    async deleteQuiz(ctx: any) {

        try {
            console.log("delete quiz");
            const user = ctx.state.user;

            const { quizId } = ctx.params;

            const quiz = await strapi.db
                .query("api::quiz.quiz")
                .findOne({
                    where: {
                        id: Number(quizId),
                        course: {
                            instructor: {
                                id: user.id,
                            },
                        },
                    },
                });

            if (!quiz) {
                return ctx.forbidden("Quiz not found or you are not the instructor.");
            }

            await strapi.db
                .query("api::quiz.quiz")
                .delete({
                    where: {
                        id: Number(quizId),
                    },
                });

            ctx.body = {
                message: "Quiz deleted successfully.",
                quiz
            };

        }
        catch (error: any) {
            return ctx.internalServerError(error.message);
        }

    },

    async updateQuiz(ctx: any) {

        try {
            console.log("update quiz");
            const user = ctx.state.user;

            const { quizId } = ctx.params
            const updation = ctx.request.body;

            const quiz = await strapi.db
                .query("api::quiz.quiz")
                .findOne({
                    where: {
                        id: Number(quizId),
                        course: {
                            instructor: {
                                id: user.id,
                            },
                        },
                    },
                });

            if (!quiz) {
                return ctx.forbidden("Quiz not found or you are not the instructor.");
            }

            const updatedQuiz = await strapi.db
                .query("api::quiz.quiz")
                .update({
                    where: {
                        id: Number(quizId),
                    },
                    data: {
                        ...updation
                    },
                });

            ctx.body = {
                updatedQuiz
            };
        }
        catch (error: any) {
            return ctx.internalServerError(error.message);
        }

    },


    async courseQuizes(ctx: any) {

        try {
            console.log("courseQuizes");
            const user = ctx.state.user;

            const { courseId } = ctx.params;

            const course = await strapi.db
                .query("api::course.course")
                .findOne({
                    where: {
                        id: Number(courseId),
                        instructor: {
                            id: user.id
                        }
                    },
                });

            if (!course) {
                return ctx.badRequest('No such course')
            }

            const quizzes = await strapi.db
                .query("api::quiz.quiz")
                .findMany({
                    where: {
                        course: {
                            id: Number(courseId),
                        },
                    },
                    orderBy: {
                        createdAt: "asc",
                    },
                });

            ctx.body = {
                quizzes
            };
        }
        catch (error: any) {
            return ctx.internalServerError(error.message);
        }

    },

}




