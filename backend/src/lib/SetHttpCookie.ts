

export function SetHttpCookie(ctx: any, age: number, key: string, value: string | null,) {
    const isSecure = ctx.secure || ctx.headers["x-forwarded-proto"] === "https";
    ctx.cookies.set(key, value, {
        httpOnly: true,
        maxAge: age * 24 * 60 * 60 * 1000,
        sameSite: "lax",
        secure: isSecure,
    });
}


export function GetHttpCookie(ctx: any, key: string) {
    let token = ctx.cookies.get(key);
    return token;
}