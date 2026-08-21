import { useFetch } from "@/hooks/use-fetch"
import { Waitress } from "../types/order"

export function fetchWaitresses() {
    return useFetch<Waitress[]>("waitresses")
}