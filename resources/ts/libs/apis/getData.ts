import type { ApiResponse } from "@/types";

import axios from "axios";

export default async function getPaginatedData<T>(endpoint: string): Promise<ApiResponse<T>> {
  const { data } = await axios.get<ApiResponse<T>>(`/api${endpoint}`);
  return data;
}
