"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Loader } from "lucide-react";

interface ProtectedRouteProps {
    children: React.ReactNode;
    redirectTo?: string;
}

export default function Route({
    children,
    redirectTo = "/profile",
}: ProtectedRouteProps) {

    const { user, authenticating } = useAuth();
    const router = useRouter()

    useEffect(() => {
        if (authenticating) return;

        if (user) router.push(redirectTo)

    }, [user, authenticating])

    if (authenticating) return <Loader />

    if (user) {
        return <></>;
    }


    return <>{children}</>;
}