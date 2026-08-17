export type OrderPayload = {
	table: number;
    chair: number,
    items: {
        dishId: string
    }[]
}