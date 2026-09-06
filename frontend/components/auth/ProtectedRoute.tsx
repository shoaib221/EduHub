"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

interface ProtectedRouteProps {
    children: React.ReactNode;
    redirectTo?: string;
}

export default function ProtectedRoute({
    children,
    redirectTo = "/login",
}: ProtectedRouteProps) {

    const { user, authenticating } = useAuth();


    const router = useRouter();


    useEffect(() => {

        if (authenticating) return;

        if (!user) {
            router.replace(redirectTo);
        }

    }, [
        user,
        authenticating,
        redirectTo,
        router,
    ]);


    if (authenticating) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                Loading...
            </div>
        );
    }


    if (!user) {
        return null;
    }


    return <>{children}</>;
}