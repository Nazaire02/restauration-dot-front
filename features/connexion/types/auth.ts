import { SessionUser } from "@/type";

export type Credentials = {
  email: string;
  password: string;
};

export type Session = {
  user: SessionUser;
  token?: string | null;
};
