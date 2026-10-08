export const dynamic = "force-dynamic";


import ClientPage from "./client-page";
import ErrorProcessor from "@/lib/ErrorProcessor";
import { cookies } from "next/headers";



export default async function TestPage() {
    console.log("server page")



    return (
        <div>
            <h1 className="font-bold text-center">Test Page</h1>


            <div>

            </div>
            <ClientPage />
        </div>
    )
}
