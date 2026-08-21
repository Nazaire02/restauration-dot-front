
export type Waitress = {
  id: string;
  user: {
    name: string
  }
};

export type Order = {
  table:number;
  chair: number;
  items: {
    dishId: string;
    name: string;
    quantity: number
  }[];
  status: "en_attente" | "en_cours" | "servie"
  createdAt: string
}