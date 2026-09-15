export interface Question {
    id?: number;
    statement: string;
    options: string[];
    correctAnswer: number;
    order: number;
    quiz: number;
}