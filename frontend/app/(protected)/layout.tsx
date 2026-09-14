import { ReactNode, Suspense } from "react";
import { redirect } from "next/navigation";

import { cookies } from "next/headers";
import { serverApi } from "@/lib/server-api";
import ProtectedLayout from "@/components/server/ProtectedRoute";
import { Loader } from "lucide-react";

interface LayoutProps {
    children: ReactNode;
}

export default async function Layout({
    children,
}: LayoutProps) {


    return (
        <Suspense fallback={<Loader />} >
            {children}
        </Suspense>


    )
}