import { ApiCourseEnrollmentCourseEnrollment } from "../../../../types/generated/contentTypes";
import { ErrorProcessor } from "../../../lib/ErrorProcessor";


export default {

    async getQuizResult(ctx: any) {
        try {
            console.log("");

            const user = ctx.state.user;
            const { quizId } = ctx.params;


            const quiz = await strapi.db
                .query("api::quiz.quiz")
                .findOne({
                    where: {
                        id: Number(quizId),
                    },

                    populate: {
                        course: true,
                    },
                });

            const enrollment = await strapi.db.query("api::course-enrollment.course-enrollment")
                .findOne({
                    where: {
                        course: {
                            id: quiz.course.id
                        },
                        student: {
                            id: user.id
                        }
                    }
                })

            const quizResults = enrollment?.quizResults ?? {};
            const result = quizResults[Number(quizId)]

            result["correctAnswers"] = quiz.correctAnswers;


            ctx.body = {
                result
            }
        } catch (error) {
            return ctx.internalServerError(ErrorProcessor(error));
        }
    },

    async submitQuizTest(ctx: any) {
        try {
            console.log("submit quiz test");

            const user = ctx.state.user;
            const { quizId } = ctx.params;
            const { answers } = ctx.request.body;

            const quiz = await strapi.db
                .query("api::quiz.quiz")
                .findOne({
                    where: {
                        id: Number(quizId),
                    },

                    populate: {
                        course: true,
                    },
                });

            const enrollment = await strapi.db.query("api::course-enrollment.course-enrollment")
                .findOne({
                    where: {
                        course: {
                            id: quiz.course.id
                        },
                        student: {
                            id: user.id
                        }
                    }
                })


            let score = 0;

            for (const [key, value] of Object.entries(answers)) {
                if (quiz.correctAnswers[key] === value) score++;
            }

            score = Math.round(score / quiz.totalQuestions * 100);

            const result = { score, answers };

            const quizResults = enrollment?.quizResults ?? {};
            quizResults[Number(quizId)] = result;

            await strapi.db.query("api::course-enrollment.course-enrollment")
                .update({
                    where: {
                        course: {
                            id: quiz.course.id
                        },
                        student: {
                            id: user.id
                        }
                    },
                    data: {
                        quizResults
                    }
                })

            ctx.body = {
                "message": "quiz submitted successfully"
            }
        } catch (error) {
            return ctx.internalServerError(ErrorProcessor(error));
        }
    },

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
                        correctAnswers: {}
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




