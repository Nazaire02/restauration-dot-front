import { SessionUser, Waitress } from "@/type";

export const initialWaitresses: Waitress[] = [
  {
    id: "w1",
    name: "Aminata Traoré",
    email: "aminata@dot.ci",
    tables: [1, 2, 3, 4],
    online: true,
  },
  {
    id: "w2",
    name: "Fatou Bamba",
    email: "fatou@dot.ci",
    tables: [5, 6, 7],
    online: true,
  },
  {
    id: "w3",
    name: "Grâce Kouassi",
    email: "grace@dot.ci",
    tables: [8, 9, 10, 11],
    online: false,
  },
];

export interface DemoAccount {
  email: string;
  password: string;
  user: SessionUser;
}

export const demoAccounts: DemoAccount[] = [
  {
    email: "admin@dot.ci",
    password: "admin",
    user: { id: "a1", name: "Yao N'Guessan", email: "admin@dot.ci", role: "admin" },
  },
  {
    email: "aminata@dot.ci",
    password: "serveuse",
    user: {
      id: "w1",
      name: "Aminata Traoré",
      email: "aminata@dot.ci",
      role: "serveuse",
    },
  },
];