const nodeEnv = process.env.NODE_ENV ?? "development";


export const clientVariables = {
    nodeEnv,
    backendApiUrl: process.env.NEXT_PUBLIC_BACKEND_API_URL ?? ""
};

