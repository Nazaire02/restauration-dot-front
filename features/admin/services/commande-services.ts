import { useFetch } from "@/hooks/use-fetch"
import { Order } from "../types/order"

export function fetchCommandes({ table, waitressId, status }: { table: string, waitressId: string, status: string }) {
    const params = new URLSearchParams()
    params.append('table', table)
    params.append('waitressId', waitressId)
    params.append('status', status)

    const query = params.toString() ? `?${params.toString()}` : ''
    return useFetch<Order[]>(`orders/${query}`)
}