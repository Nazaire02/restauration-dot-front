import { Category, Dish } from "@/type";

export const initialCategories: Category[] = [
  { id: "entrees", name: "Entrées", description: "Pour ouvrir la cérémonie" },
  { id: "plats", name: "Plats", description: "Les grandes assiettes" },
  { id: "desserts", name: "Desserts", description: "Douceurs de fin de fête" },
  { id: "boissons", name: "Boissons", description: "Rafraîchissements" },
];

export const initialDishes: Dish[] = [
  {
    id: "d1",
    name: "Poulet braisé & attiéké",
    description: "Poulet mariné aux épices douces, attiéké fin et sauce claire.",
    categoryId: "plats",
    image: "/assets/plat-1.jpg",
    available: true,
  },
  {
    id: "d2",
    name: "Riz jollof aux gambas",
    description: "Riz parfumé à la tomate, gambas grillées, herbes fraîches.",
    categoryId: "plats",
    image: "/assets/plat-2.jpg",
    available: true,
  },
  {
    id: "d3",
    name: "Sauce arachide & agneau",
    description: "Mijoté onctueux d'agneau à la pâte d'arachide.",
    categoryId: "plats",
    image: "/assets/plat-3.jpg",
    available: true,
  },
  {
    id: "d4",
    name: "Poisson grillé & alloco",
    description: "Poisson entier grillé, bananes plantain caramélisées.",
    categoryId: "plats",
    image: "/assets/plat-4.jpg",
    available: false,
  },
  {
    id: "d5",
    name: "Petits feuilletés croustillants",
    description: "Feuilletés dorés servis avec une sauce relevée.",
    categoryId: "entrees",
    image: "/assets/plat-5.jpg",
    available: true,
  },
  {
    id: "d6",
    name: "Salade avocat & mangue",
    description: "Jeunes pousses, avocat, mangue mûre, vinaigrette légère.",
    categoryId: "entrees",
    image: "/assets/plat-6.jpg",
    available: true,
  },
  {
    id: "d7",
    name: "Panna cotta coco & mangue",
    description: "Crème de coco délicate, coulis de mangue fraîche.",
    categoryId: "desserts",
    image: "/assets/plat-7.jpg",
    available: true,
  },
  {
    id: "d8",
    name: "Bissap glacé à la menthe",
    description: "Infusion d'hibiscus servie très fraîche.",
    categoryId: "boissons",
    image: "/assets/plat-8.jpg",
    available: true,
  },
];