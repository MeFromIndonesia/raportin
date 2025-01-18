import { Config } from "ziggy-js";

type UserRole = "siswa" | "admin"

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string;
  role: UserRole;
  created_at: Date;
  updated_at: Date | null;
}

interface FlashMessage {
  success?: string;
  info?: string;
  warning?: string;
  error?: string;
}

export interface ApiResponse<T> {
  data: T[];
  links: {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number | null;
    last_page: number;
    links: {
      url: string | null;
      label: string;
      active: boolean;
    }[];
    path: string;
    per_page: number;
    to: number | null;
    total: number;
  };
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
  auth: {
    user: User;
  };
  ziggy: Config & { location: string };
  flash: FlashMessage;
};
