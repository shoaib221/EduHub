// src/api/course-enrollment/services/course-enrollment.ts

import type { Core } from "@strapi/strapi";
import { Course } from "../../../../types/course";

export default {

    async lessonAnalytics(
        strapi: Core.Strapi,
        course: Course
    ) {

        if (!course) {
            return null;
        }

        let lessons = await strapi.db
            .query("api::lesson.lesson")
            .findMany({
                where: {
                    course: {
                        id: course.id,
                    },
                },
            });

        let lessonsCompleted: Record<number, {
            title: string;
            completed: number;
        }> = {};


        for (const lesson of lessons) {
            lessonsCompleted[Number(lesson.id)] = {
                title: lesson.title,
                completed: 0
            }
        }

        let enrollments = await strapi.db
            .query("api::course-enrollment.course-enrollment")
            .findMany({
                where: {
                    course: {
                        id: course.id,
                    },
                },
            });

        for (const enrollment of enrollments) {
            for (const key in enrollment.completedLessons) {
                lessonsCompleted[Number(key)].completed++;
            }
        }


        return {
            totalLessons: lessons.length,
            lessonsCompleted
        }

    },

    async quizAnalytics(
        strapi: Core.Strapi,
        course: Course
    ) {

        if (!course) {
            return null;
        }

        let quizzes = await strapi.db
            .query("api::quiz.quiz")
            .findMany({
                where: {
                    course: {
                        id: course.id,
                    },
                },
            });

        let quizzesSubmitted: Record<number, {
            title: string;
            completed: number;
            averageScore: number
        }> = {};


        for (const quiz of quizzes) {
            quizzesSubmitted[Number(quiz.id)] = {
                title: quiz.title,
                completed: 0,
                averageScore: 0
            }
        }

        let enrollments = await strapi.db
            .query("api::course-enrollment.course-enrollment")
            .findMany({
                where: {
                    course: {
                        id: course.id,
                    },
                },
            });

        for (const enrollment of enrollments) {
            for (const key in enrollment.quizResults) {

                if (!isNaN(enrollment.quizResults[key]?.score)) {
                    quizzesSubmitted[Number(key)].completed++;
                    quizzesSubmitted[Number(key)].averageScore += enrollment.quizResults[key].score;
                }

            }
        }

        for (const key in quizzesSubmitted) {
            quizzesSubmitted[key].averageScore /= quizzesSubmitted[key].completed;
        }


        return {
            totalQuizzes: quizzes.length,
            quizzesSubmitted
        }

    },

    async courseInstructorAnalytics(
        strapi: any,
        course: Course
    ) {

        if (!course) {
            return null;
        }

        const totalEnrollments = await strapi.db
            .query("api::course-enrollment.course-enrollment")
            .count({
                where: {
                    course: {
                        id: course.id,
                    },
                },
            });

        const totalCompletedCourse = await strapi.db
            .query("api::course-enrollment.course-enrollment")
            .count({
                where: {
                    course: {
                        id: course.id,
                    },
                    completed: true
                },
            });

        const lessonData = await this.lessonAnalytics(strapi, course)
        const quizData = await this.quizAnalytics(strapi, course)


        return {
            totalEnrollments, totalCompletedCourse,
            ...lessonData, ...quizData
        }

    },


};