import { handleError } from "./error-handler";

export interface RequestOptions {
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    body?: Record<string, unknown> | FormData;
    token?: string;
    headers?: HeadersInit;
    isFormData?: boolean;
    retry?: boolean;
    isRevalidate?: boolean;
}

interface NextRequestInit extends RequestInit {
    next?: {
        revalidate: number;
    };
}

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const subscribeTokenRefresh = (cb: (token: string) => void) => {
    refreshSubscribers.push(cb);
};

const onRefreshed = (token: string) => {
    refreshSubscribers.forEach((cb) => cb(token));
    refreshSubscribers = [];
};

export async function fetchWrapper<T>(remainUrl: string, options: RequestOptions = {}): Promise<T> {
    let tokens = "getTokens()";
    const {
        method = "GET",
        body,
        headers,
        isFormData = false,
        isRevalidate = false,
    } = options;

    const fetchOptions: NextRequestInit = {
        method,
        headers: {
            // ...(tokens?.access && { Authorization: `Bearer ${tokens.access}` }),
            ...headers
        },
    };

    if (isRevalidate) {
        fetchOptions.cache = "force-cache";
        fetchOptions.next = { revalidate: 60 };
    }

    if (body) {
        if (isFormData && body instanceof FormData) {
            fetchOptions.body = body;
        } else if (typeof body === 'object') {
            fetchOptions.headers = {
                "Content-Type": "application/json",
                ...fetchOptions.headers,
            };
            fetchOptions.body = JSON.stringify(body);
        }
    }

    let response = await fetch(`${backendUrl}${remainUrl}`, fetchOptions);
    const status = response.status;

    if (!response.ok) {
        const errorBody = await response.json();
        throw handleError(errorBody.error, status, errorBody);
    }
    return response.json();
}
