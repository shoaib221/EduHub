

function getEnv(name: string): string {
    const value = process.env[name];

    if (!value) {
        throw new Error(`Missing environment variable: ${name}`);
    }

    return value;
}



export const envVariables = {
    host: "",
    port: "",
    nodeEnv: "",
    cloudinaryCloudName: "",
    cloudinaryApiKey: "",
    cloudinaryApiSecret: "",
    appKeys: "",
    apiTokenSalt: "",
    adminJwtSecret: "",
    jwtSecret: "",
    transferTokenSalt: "",
    encryptionKey: "",
    stripeKey: "",
    frontendUrl: "",
    databaseClient: "",
    databaseUrl: "",
    databaseHost: "",
    databasePort: "",
    databaseName: "",
    databaseUsername: "",
    databasePassword: "",
    databaseSsl: "",
    databaseSslRejectUnauthorized: "",
    databaseSchema: ""
};

function loadVariables() {
    const nodeEnv = getEnv("NODE_ENV");

    envVariables.cloudinaryCloudName = getEnv("CLOUDINARY_CLOUD_NAME");
    envVariables.cloudinaryApiKey = getEnv("CLOUDINARY_API_KEY");
    envVariables.cloudinaryApiSecret = getEnv("CLOUDINARY_API_SECRET");
    envVariables.appKeys = getEnv("APP_KEYS");
    envVariables.apiTokenSalt = getEnv("API_TOKEN_SALT");
    envVariables.adminJwtSecret = getEnv("ADMIN_JWT_SECRET");
    envVariables.jwtSecret = getEnv("JWT_SECRET");
    envVariables.transferTokenSalt = getEnv("TRANSFER_TOKEN_SALT");
    envVariables.encryptionKey = getEnv("ENCRYPTION_KEY");
    envVariables.stripeKey = getEnv("STRIPE_KEY");



    envVariables.nodeEnv = nodeEnv
    if (nodeEnv === 'production') {
        envVariables.frontendUrl = getEnv("FRONTEND_URL")
    }
    else {
        envVariables.frontendUrl = getEnv("LOCAL_FRONTEND_URL")
    }
}

loadVariables();