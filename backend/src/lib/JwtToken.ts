

export async function JwtTokenGenerate(strapi: any, payload: any) {
    const jwtToken = await strapi.plugin("users-permissions")
        .service("jwt")
        .issue(payload);

    return jwtToken;
}


export async function JwtTokenValidate(strapi: any, token: string) {

    const payload = await strapi.plugin("users-permissions")
        .service("jwt")
        .verify(token);

    return payload;
}