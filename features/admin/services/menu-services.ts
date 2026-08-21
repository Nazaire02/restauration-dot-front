import { fetchWrapper } from "@/services/fetch-wrapper";

export async function addDish(dish: {
    name: string, description: string, image: string; available: boolean
}) {
    return fetchWrapper(`dishes`, {
        method: 'POST',
        body: dish,
    });
}