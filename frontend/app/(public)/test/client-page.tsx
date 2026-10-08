"use client"

import api from "@/lib/axios";
import ErrorProcessor from "@/lib/ErrorProcessor";
import React from "react";


export default function ClientPage() {
    console.log("client page");
    const [serverMessage, setServerMessage] = React.useState("client request failed");
    const [serverProtectedMessage, setServerProtectedMessage] = React.useState("client protected request failed");
    const [error, setError] = React.useState<any>(null)

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                let res = await api.get("/test-endpoint");
                setServerMessage(res.data);
                res = await api.get("/test-protected-endpoint");
                setServerProtectedMessage(res.data);
            } catch (error: any) {
                setError(ErrorProcessor(error))
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <div>
                <h2 className="font-bold" >Client Message:</h2>
                <p>{JSON.stringify(serverMessage)}</p>
                <h2 className="font-bold" >Client Protected Message:</h2>
                <p>{JSON.stringify(serverProtectedMessage)}</p>

                <h2 className="font-bold" >Error</h2>
                <p>{JSON.stringify(error)}</p>
            </div>
        </div>
    )
}
