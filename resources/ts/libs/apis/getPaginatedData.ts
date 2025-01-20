import type { PaginatedApiResponse } from "@/types";

import axios from "axios";

export default async function getPaginatedData<T>(endpoint: string): Promise<PaginatedApiResponse<T>> {
  const { data } = await axios.get<PaginatedApiResponse<T>>(`/api${endpoint}`);
  return data;
}
