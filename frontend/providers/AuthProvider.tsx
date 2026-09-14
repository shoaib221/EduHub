"use client";

import { useEffect, useState } from "react";
import { AuthContext, User } from "@/context/AuthContext";
import ErrorProcessor from "@/lib/ErrorProcessor";
import api from "@/lib/axios";

interface AuthProviderProps {
    children: React.ReactNode;
}

export default function AuthProvider({
    children,
}: AuthProviderProps) {

    const [authenticating, setAuthenticating] = useState(true)

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {

        async function Auth() {
            try {
                const response = await api.get("/auth/me")
                setUser(response.data.user)
                console.log(response.data.user)
            }
            catch (err) {
                console.log(ErrorProcessor(err))
            }
            finally {
                setAuthenticating(false)
            }
        }

        Auth();
    }, [])

    const login = (user: User) => {
        setUser(user);
    };

    const logout = async () => {


        try {
            const response = await api.get("/auth/logout");
            setUser(null);
        }
        catch (err) {
            ErrorProcessor(err)
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                authenticating
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}