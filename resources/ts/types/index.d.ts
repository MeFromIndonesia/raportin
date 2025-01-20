import { Config } from "ziggy-js";

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string;
  created_at: Date;
  updated_at: Date;
}

export interface StudentClass {
  id: number;
  grade: number;
  major: string;
}

export interface Student {
  id: number;
  nisn: number;
  name: string;
  place_of_birth: string;
  date_of_birth: string;
  student_class: StudentClass;
  created_at: Date;
  updated_at: Date;
}

export interface FlashMessage {
  success?: string;
  info?: string;
  warning?: string;
  error?: string;
}

export interface ApiResponse<T> {
  data: T[];
}

export interface PaginatedApiResponse<T> {
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
