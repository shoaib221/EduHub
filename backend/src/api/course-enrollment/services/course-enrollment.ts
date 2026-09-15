// src/api/course-enrollment/services/course-enrollment.ts

export default {

    async getEnrolledLessons(
        strapi: any,
        enrollment: any,
        course: any
    ) {


        if (!enrollment) {
            return [];
        }

        let completedLessons = enrollment.completedLessons ?? {};

        let lessons = course?.lessons ?? [];

        const totalLessons = lessons.length;

        lessons = lessons.map((lesson: any) => ({
            title: lesson.title,
            completed: completedLessons[lesson.id] === true,
        }));

        completedLessons = Object.keys(completedLessons).length

        const progress = Math.round(completedLessons / totalLessons * 100);

        return {
            totalLessons,
            completedLessons,
            progress,
            lessons
        }
    },

    async getEnrolledQuizzes(
        strapi: any,
        enrollment: any,
        course: any
    ) {
        if (!enrollment) {
            return [];
        }

        let quizResults = enrollment.quizResults ?? {};

        let quizzes = course?.quizzes ?? [];

        const totalQuizzes = quizzes.length;

        let quizAverage = 0;

        quizzes = quizzes.map((quiz: any) => {
            let score = -1;
            // console.log(quizResults[quiz.id]?.score, quiz.totalQuestions)
            if (quizResults[quiz.id]?.score) {

                score = Math.round(quizResults[quiz.id].score / quiz.totalQuestions * 100);
                quizAverage += score
            }


            return {
                title: quiz.title,
                score,
            }
        });

        quizAverage /= Math.round(Object.keys(quizResults).length)

        console.log("enrolled quiz service", totalQuizzes, quizzes, quizAverage)

        return {
            totalQuizzes,
            quizzes,
            quizAverage
        }
    },

};