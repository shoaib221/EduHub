import { cookies } from "next/headers";
import { envVariables } from "./serverVariables";

export async function serverApi(
    url: string,
    options?: RequestInit
) {

    const cookieStore = await cookies();


    const cookieHeader = cookieStore
        .getAll()
        .map(
            ({ name, value }) =>
                `${name}=${value}`
        )
        .join("; ");


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