import { envVariables } from "../../config/environment_variables";


export function SetHttpCookie(ctx: any, ageDays: number, key: string, value: string | null,) {
    const isSecure = ctx.secure;
    console.log("SetHttpCookie isSecure", isSecure);
    ctx.cookies.set(key, value, {
        httpOnly: true,
        maxAge: ageDays * 24 * 60 * 60 * 1000,
        sameSite: envVariables.nodeEnv === "production" ? "none" : "lax",
        secure: isSecure,
        path: "/",
    });
}


export function GetHttpCookie(ctx: any, key: string) {
    let token = ctx.cookies.get(key);
    return token;
}