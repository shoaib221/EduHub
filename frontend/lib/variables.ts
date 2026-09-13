"use client"


const envVariables = {
    nodeEnv: "",
    backendApiUrl: ""
};


function getEnv(name: string): string {

    const value = process.env[name] ?? "";

    console.log(name, value);

    return value;
}


function loadVariables() {

    const nodeEnv = getEnv(
        "NODE_ENV"
    );

    envVariables.nodeEnv = nodeEnv;


    if (nodeEnv === "production") {

        envVariables.backendApiUrl =
            getEnv(
                "NEXT_PUBLIC_BACKEND_API_URL"
            );

    } else {

        envVariables.backendApiUrl =
            getEnv(
                "NEXT_PUBLIC_LOCAL_BACKEND_API_URL"
            );

    }
}

loadVariables();

export { envVariables };