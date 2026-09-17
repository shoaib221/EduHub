


export const envVariables = {
    host: process.env["HOST"]!,
    port: process.env["PORT"]!,
    nodeEnv: process.env["NODE_ENV"]!,
    publicUrl: process.env["PUBLIC_URL"]!,
    cloudinaryCloudName: process.env["CLOUDINARY_CLOUD_NAME"]!,
    cloudinaryApiKey: process.env["CLOUDINARY_API_KEY"]!,
    cloudinaryApiSecret: process.env["CLOUDINARY_API_SECRET"]!,
    appKeys: process.env["APP_KEYS"]!,
    apiTokenSalt: process.env["API_TOKEN_SALT"]!,
    adminJwtSecret: process.env["ADMIN_JWT_SECRET"]!,
    jwtSecret: process.env["JWT_SECRET"]!,
    transferTokenSalt: process.env["TRANSFER_TOKEN_SALT"]!,
    encryptionKey: process.env["ENCRYPTION_KEY"]!,
    stripeKey: process.env["STRIPE_KEY"]!,
    frontendUrl: process.env["FRONTEND_URL"]!
};

