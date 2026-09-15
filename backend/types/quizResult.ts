import { User } from "./user";
import { Quiz } from "./quiz";

export interface QuizResult {
    answers: number[],
    score: number,
    examinee: User,
    quiz: Quiz
}