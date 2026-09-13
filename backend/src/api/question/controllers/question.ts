export default {


    async createQuestion(ctx: any) {
        try {
            console.log("create question");
            const user = ctx.state.user;

            const { quizId } = ctx.params;
            const payload = ctx.request.body;

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
                ctx.badRequest("No such quiz")
            }

            const createdQuestion = await strapi.db
                .query("api::question.question")
                .create({
                    data: {
                        ...payload,
                        quiz: quiz.id,
                    },
                });

            let correctAnswers = quiz.correctAnswers;
            correctAnswers[createdQuestion.id] = createdQuestion.correctAnswer;

            await strapi.db
                .query("api::quiz.quiz")
                .update({
                    where: {
                        id: Number(quizId),
                    },
                    data: {
                        correctAnswers
                    }
                });


            ctx.body = {
                createdQuestion
            };

        }
        catch (error: any) {
            return ctx.internalServerError(error.message);
        }
    },

    async deleteQuestion(ctx: any) {

        try {

            console.log("deleteQuestion");
            const user = ctx.state.user;

            const { questionId } = ctx.params;

            if (Number(questionId) <= 0) {
                throw new Error("invalid questionId")
            }

            const question = await strapi.db
                .query("api::question.question")
                .findOne({
                    where: {
                        id: Number(questionId),
                        quiz: {
                            course: {
                                instructor: {
                                    id: user.id,
                                },
                            },
                        }
                    },
                });



            if (!question) {
                return ctx.badRequest("No such question")
            }



            const deletedQuestion = await strapi.db
                .query("api::question.question")
                .delete({
                    where: {
                        id: Number(questionId),
                    },
                });


            ctx.body = {
                deletedQuestion
            };
        }
        catch (error: any) {
            return ctx.internalServerError(error.message);
        }
    },

    async quizQuestions(ctx: any) {

        try {

            console.log("quizQuestions");
            const user = ctx.state.user;

            const { quizId } = ctx.params;

            const quiz = await strapi.db
                .query("api::quiz.quiz")
                .findOne({
                    where: {
                        id: Number(quizId),
                    },
                });

            if (!quiz) {
                ctx.badRequest("No such quiz")
            }

            const questions = await strapi.db
                .query("api::question.question")
                .findMany({
                    where: {
                        quiz: {
                            id: Number(quizId),
                        }
                    },
                });


            ctx.body = {
                questions
            };
        }
        catch (error: any) {
            return ctx.internalServerError(error.message);
        }
    },

};

