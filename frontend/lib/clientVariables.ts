const nodeEnv = process.env.NODE_ENV ?? "development";


const clientVariables = {
    nodeEnv,
    backendApiUrl:
        nodeEnv === "production"
            ? process.env.NEXT_PUBLIC_BACKEND_API_URL ?? ""
            : process.env.NEXT_PUBLIC_LOCAL_BACKEND_API_URL ?? "",
};





export {
    clientVariables,
};