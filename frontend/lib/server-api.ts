import { cookies } from "next/headers";

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
        `${process.env.NEXT_PUBLIC_API_URL}${url}`,
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
        const error = await res.json()
            .catch(() => null);

        console.log(error);

        return null;
    }


    return res.json();
}