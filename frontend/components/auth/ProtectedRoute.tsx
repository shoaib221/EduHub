"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Loader } from "lucide-react";

interface ProtectedRouteProps {
    children: React.ReactNode;
    redirectTo?: string;
}

export default function ProtectedRoute({
    children,
    redirectTo = "/login",
}: ProtectedRouteProps) {

    const router = useRouter()
    const { user, authenticating } = useAuth();

    useEffect(() => {
        if (authenticating) return;

        if (!user) router.replace(redirectTo)
    }, [user, authenticating])

    if (authenticating) return <Loader />

    if (!user) {
        return null;
    }


    return children;
}