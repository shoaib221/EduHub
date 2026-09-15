import { User } from "./user";
import { Lesson } from "./lesson";
import { Quiz } from "./quiz";


export interface Course {

    id?: number;
    title?: string;
    description?: string;
    coverImage?: string;
    category?: string;
    price?: number;
    instructor?: User;
    lessons?: Lesson[];
    quizzes?: Quiz[];
    enrolled_users?: User[];
    createdAt?: string;
    updatedAt?: string;
}


