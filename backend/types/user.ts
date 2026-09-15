export interface User {
    id: number;

    username: string;

    email: string;

    role?: {
        id: number;
        name: string;
    };

    avatar?: {
        id: number;
        url: string;
    };

    createdAt: string;

    updatedAt: string;
}