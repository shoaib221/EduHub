import { cookies } from "next/headers";

export async function getUserRole() {

    try {
        const cookieStore = await cookies();

        const token = cookieStore.get(
            "userRole"
        )?.value;

        return token;
    } catch (error) {
        return null;
    }

}