import { Order } from "@/features/admin/types/order"
import { useFetch } from "@/hooks/use-fetch"
import { fetchWrapper } from "@/services/fetch-wrapper"

export function fetchCommandesByServeuse({ waitressId }: { waitressId: string }) {
    const params = new URLSearchParams()
    params.append('waitressId', waitressId)
    params.append('status', "en_attente")

    const query = params.toString() ? `?${params.toString()}` : ''
    return useFetch<Order[]>(`orders/${query}`)
}

export async function markServed(orderId: string) {
    return fetchWrapper(`orders/${orderId}/status`, {
        method: 'PATCH',
        body: {
            status: "servie"
        },
    });
}