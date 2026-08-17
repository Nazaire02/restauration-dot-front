import { fetchWrapper } from "@/services/fetch-wrapper";
import { Credentials, Session } from "../types/auth";

export function login(credentials: Credentials) {
    return fetchWrapper<Session>("auth/login", {
        method: "POST",
        body: credentials,
        skipAuth: true,
    });
}
