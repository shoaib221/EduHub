import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { cookies } from "next/headers";
import { serverApi } from "@/lib/server-api";
import ProtectedLayout from "@/components/server/ProtectedRoute";

interface LayoutProps {
    children: ReactNode;
}

export default async function Layout({
    children,
}: LayoutProps) {


    return (
        <>
            {children}
        </>
    )
}