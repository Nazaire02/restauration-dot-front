import { useFetch } from "@/hooks/use-fetch";
import { Menu } from "../types/menu";
import { fetchWrapper } from "@/services/fetch-wrapper";
import { OrderPayload } from "../types/order";

export function fetchMenu() {
    return useFetch<Menu[]>(`dishes`)
}

export async function addOrder(order: OrderPayload) {
    return fetchWrapper('orders', {
        method: 'POST',
        body: order,
    });
}