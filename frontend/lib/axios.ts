import axios from "axios";
import { envVariables } from "./variables";

console.log("api ", envVariables);

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_LOCAL_BACKEND_API_URL,
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