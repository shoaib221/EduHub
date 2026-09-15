// src/types/quiz.ts

import { Course } from "./course";
import { Question } from "./question";

export interface Quiz {
    id?: number;
    title?: string;
    description?: string;
    order?: number;
    course?: Course;
    questions?: Question[];
}