import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {

    const token = (await cookies()).get("jwtAuthToken")?.value;

    if (token) {
        redirect("/profile");
    }


    return children;
}