import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {


    return children;
}