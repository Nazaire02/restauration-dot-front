import { Order } from "@/type";

const minutesAgo = (m: number) => Date.now() - m * 60_000;

export const initialOrders: Order[] = [
  {
    id: "o1",
    table: 1,
    chair: 3,
    items: [
      { dishId: "d1", name: "Poulet braisé & attiéké", quantity: 2 },
      { dishId: "d8", name: "Bissap glacé à la menthe", quantity: 2 },
    ],
    status: "en_attente",
    createdAt: minutesAgo(4),
    waitressId: null,
  },
  {
    id: "o2",
    table: 2,
    chair: 1,
    items: [{ dishId: "d2", name: "Riz jollof aux gambas", quantity: 1 }],
    status: "en_cours",
    createdAt: minutesAgo(11),
    waitressId: "w1",
  },
  {
    id: "o3",
    table: 6,
    chair: 5,
    items: [
      { dishId: "d6", name: "Salade avocat & mangue", quantity: 1 },
      { dishId: "d3", name: "Sauce arachide & agneau", quantity: 1 },
    ],
    status: "en_attente",
    createdAt: minutesAgo(2),
    waitressId: null,
  },
  {
    id: "o4",
    table: 9,
    chair: 2,
    items: [{ dishId: "d7", name: "Panna cotta coco & mangue", quantity: 3 }],
    status: "servie",
    createdAt: minutesAgo(38),
    waitressId: "w3",
  },
  {
    id: "o5",
    table: 3,
    chair: 7,
    items: [{ dishId: "d5", name: "Petits feuilletés croustillants", quantity: 2 }],
    status: "servie",
    createdAt: minutesAgo(52),
    waitressId: "w1",
  },
];