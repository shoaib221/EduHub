import axios from "axios";
import { clientVariables } from "./clientVariables";



// const nodeEnv = process.env["NODE_ENV"]
// const backendUrl = (nodeEnv === "production" ? process.env["NEXT_PUBLIC_BACKEND_API_URL"] : process.env["NEXT_PUBLIC_LOCAL_BACKEND_API_URL"])

console.log(clientVariables.backendApiUrl, clientVariables.nodeEnv)

const api = axios.create({
    baseURL: clientVariables.backendApiUrl,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, // send cookies automatically
});


api.interceptors.response.use(
    (response) => response,

    (error) => {

        if (
            typeof window !== "undefined" &&
            error.response?.status === 401
        ) {
            window.dispatchEvent(
                new Event("auth:logout")
            );
        }

        return Promise.reject(error);
    }
);


export default api;