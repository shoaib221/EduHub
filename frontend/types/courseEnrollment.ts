import { User } from "./user";
import { Lesson } from "./lesson";
import { Quiz } from "./quiz";
import { Course } from "./course";
import { QuizResult } from "./quizResult";
import { Payment } from "./payment";

export interface CourseEnrollment {
    id?: number;
    course?: Course;
    student?: User;
    quizResults?: object;
    completedLessons?: object;
    payment?: Payment;
}


