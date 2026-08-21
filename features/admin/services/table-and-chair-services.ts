import { useFetch } from "@/hooks/use-fetch"

export function fetchTables() {
    return useFetch<{
        "number": number
    }[]
    >(`tables`)
}