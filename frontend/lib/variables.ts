

function getEnv(name: string): string {
    const value = process.env[name];

    if (!value) {
        throw new Error(`Missing environment variable: ${name}`);
    }

    return value;
}



export const envVariables = {
    nodeEnv: "",
    backendApiUrl: ""
};

function loadVariables() {
    const nodeEnv = getEnv("NODE_ENV");
    envVariables.nodeEnv = nodeEnv;

    if (nodeEnv === 'production') {
        envVariables.backendApiUrl = getEnv("BACKEND_API_URL")
    }
    else {
        envVariables.backendApiUrl = getEnv("LOCAL_BACKEND_API_URL")
    }
}

loadVariables();