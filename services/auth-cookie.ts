import { cookies } from "next/headers";

export const AUTH_COOKIE_NAME = "token";

export async function getServerAuthToken() {
    const cookieStore = await cookies();
    return cookieStore.get(AUTH_COOKIE_NAME)?.value ?? null;
}

export async function serverAuthHeaders(): Promise<HeadersInit> {
    const token = await getServerAuthToken();
    return token ? { Cookie: `${AUTH_COOKIE_NAME}=${token}` } : {};
}
