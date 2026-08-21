import { clearSession, getAuthToken } from "@/features/connexion/store/useUserStore";
import { handleError } from "./error-handler";

export interface RequestOptions {
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    body?: Record<string, unknown> | FormData;
    token?: string | null;
    headers?: HeadersInit;
    isFormData?: boolean;
    isRevalidate?: boolean;
    skipAuth?: boolean;
    signal?: AbortSignal;
}

interface NextRequestInit extends RequestInit {
    next?: {
        revalidate: number;
    };
}

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? "";

function buildUrl(remainUrl: string) {
    const base = backendUrl.endsWith("/") ? backendUrl.slice(0, -1) : backendUrl;
    const path = remainUrl.startsWith("/") ? remainUrl.slice(1) : remainUrl;
    return `${base}/${path}`;
}

export async function fetchWrapper<T>(remainUrl: string, options: RequestOptions = {}): Promise<T> {
    const {
        method = "GET",
        body,
        token,
        headers,
        isFormData = false,
        isRevalidate = false,
        skipAuth = false,
        signal,
    } = options;

    const accessToken = skipAuth ? null : token ?? getAuthToken();
    const requestHeaders = new Headers(headers);

    if (accessToken) {
        requestHeaders.set("Authorization", `Bearer ${accessToken}`);
    }

    const fetchOptions: NextRequestInit = {
        method,
        headers: requestHeaders,
        credentials: "include",
        signal,
    };

    if (isRevalidate) {
        fetchOptions.cache = "force-cache";
        fetchOptions.next = { revalidate: 60 };
    }

    if (body) {
        if (isFormData && body instanceof FormData) {
            fetchOptions.body = body;
        } else {
            requestHeaders.set("Content-Type", "application/json");
            fetchOptions.body = JSON.stringify(body);
        }
    }

    const response = await fetch(buildUrl(remainUrl), fetchOptions);

    if (!response.ok) {
        if (response.status === 401 && !skipAuth) {
            clearSession();
        }
        const errorBody = await response.json().catch(() => null);
        throw handleError(
            errorBody?.error ?? response.statusText,
            response.status,
            errorBody?.message ?? errorBody?.details ?? response.statusText,
        );
    }

    if (response.status === 204) {
        return undefined as T;
    }

    return response.json() as Promise<T>;
}
