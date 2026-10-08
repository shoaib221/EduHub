"use client"

import api from "@/lib/axios";
import React from "react";


export default function ClientPage() {

    const [serverMessage, setServerMessage] = React.useState("client request failed");
    const [serverProtectedMessage, setServerProtectedMessage] = React.useState("client protected request failed");

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                let res = await api.get("/test-endpoint");
                setServerMessage(res.data);
                res = await api.get("/test-protected-endpoint");
                setServerProtectedMessage(res.data);
            } catch (error) {
                console.error("Error fetching data from server:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>Client Page</h1>
            <div>
                <h2 className="font-bold" >Client Message:</h2>
                <p>{JSON.stringify(serverMessage)}</p>
                <h2 className="font-bold" >Client Protected Message:</h2>
                <p>{JSON.stringify(serverProtectedMessage)}</p>
            </div>
        </div>
    )
}
