import { useFetch } from "@/hooks/use-fetch"
import { Waitress } from "../types/order"
import { fetchWrapper } from "@/services/fetch-wrapper";

export function fetchWaitresses() {
    return useFetch<Waitress[]>("waitresses")
}

export async function addWaitress(waitress: {
    name: string, email: string, password: string; tables: number[]
}) {
    return fetchWrapper(`waitresses`, {
        method: 'POST',
        body: waitress,
    });
}