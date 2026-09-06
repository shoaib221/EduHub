function getEnv(name: string): string {
    const value = process.env[name];

    if (!value) {
        throw new Error(`Missing environment variable: ${name}`);
    }

    return value;
}

export const ENV_VAR = {
    STRIPE_KEY: getEnv("STRIPE_KEY"),
    FRONTEND_URL: getEnv("FRONTEND_URL"),
};