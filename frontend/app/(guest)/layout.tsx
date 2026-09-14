import { ReactNode } from "react";
import Layout from "@/components/server/GuestRoute";

interface LayoutProps {
    children: ReactNode;
}

export default async function LayoutPage({
    children,
}: LayoutProps) {


    return children;
}