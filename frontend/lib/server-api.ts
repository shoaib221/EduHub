import { cookies } from "next/headers";
import { envVariables } from "./serverVariables";

export async function serverApi(
    url: string,
    options?: RequestInit
) {

    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();

    console.log("SERVER COOKIES:", allCookies);

    const cookieHeader = allCookies.map(
        ({ name, value }) =>
            `${name}=${value}`
    ).join("; ");

    console.log("COOKIE HEADER:", cookieHeader);


    const res = await fetch(
        `${envVariables.backendApiUrl}${url}`,
        {
            ...options,

            headers: {
                "Content-Type": "application/json",

                Cookie: cookieHeader,

                ...options?.headers,
            },

            cache: "no-store",
        }
    );




    if (!res.ok) {
        const error = await res.json().catch(() => null);

        throw new Error(
            JSON.stringify({
                status: res.status,
                statusText: res.statusText,
                url: res.url,
                error,
            })
        );
    }

    const ret = await res.json();

    return ret;
}