import { serverApi } from "@/lib/server-api";
import ClientPage from "./client-page";

export default async function TestPage() {

    let serverMessage = "server request failed";
    let serverProtectedMessage = "server protected request failed";

    try {
        let res = await serverApi("/test-endpoint");
        serverMessage = res;

        res = await serverApi("/test-protected-endpoint");
        serverProtectedMessage = res;

    } catch (error) {
        console.error("Error fetching data from server:", error);
    }


    return (
        <div>
            <h1>Test Page</h1>
            <div>
                <h2 className="font-bold" >Server Message:</h2>
                <p>{JSON.stringify(serverMessage)}</p>

                <h2 className="font-bold" >Server Protected Message:</h2>
                <p>{JSON.stringify(serverProtectedMessage)}</p>
            </div>
            <ClientPage />
        </div>
    )
}
