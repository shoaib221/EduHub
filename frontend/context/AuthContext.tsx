"use client";

import { createContext } from "react";

export interface User {
    username: string;
    email: string;
    user_role?: string;
    first_name?: string;
    last_name?: string;
}

export interface AuthContextType {
    user?: User | null;
    jwtToken?: string | null;
    isAuthenticated?: boolean;
    authenticating?: boolean;
    login: (user: User) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    jwtToken: null,
    isAuthenticated: false,

    login: () => { },
    logout: () => { },
});