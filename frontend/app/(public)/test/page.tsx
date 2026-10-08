export const dynamic = "force-dynamic";

import { serverApi } from "@/lib/server-api";
import ClientPage from "./client-page";
import ErrorProcessor from "@/lib/ErrorProcessor";
import { cookies } from "next/headers";



export default async function TestPage() {
    console.log("server page")
    let serverMessage = "server request failed";
    let serverProtectedMessage = "server protected request failed";
    let error = null;

    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();

    try {
        let res = await serverApi("/test-endpoint");
        serverMessage = res;

        res = await serverApi("/test-protected-endpoint");
        serverProtectedMessage = res;

    } catch (err) {
        error = ErrorProcessor(err);
    }


    return (
        <div>
            <h1 className="font-bold text-center">Test Page</h1>


            <div>
                <div className="font-bold" >Server Cookies</div>
                <div>
                    {JSON.stringify(allCookies)}
                </div>

                <h2 className="font-bold" >Server Message:</h2>
                <p>{JSON.stringify(serverMessage)}</p>

                <h2 className="font-bold" >Server Protected Message:</h2>
                <p>{JSON.stringify(serverProtectedMessage)}</p>

                <h2 className="font-bold" >Error</h2>
                <p>{JSON.stringify(error)}</p>
            </div>
            <ClientPage />
        </div>
    )
}
