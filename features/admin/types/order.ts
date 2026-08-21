
export type Waitress = {
  id: string;
  tables: number[]
  user: {
    name: string;
    email: string;
    online: boolean
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