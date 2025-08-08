"use client";

import http from "@/core/services/interceptor/interceptor.client";
import { Student, Term } from "@/types";
import { useQuery, type UseQueryResult } from "react-query";

type ChartResponse = { terms: Term[] };

export default function useGetChart(): UseQueryResult<ChartResponse> {
  return useQuery<ChartResponse>({
    queryKey: ["chart"],
    queryFn: () =>
      http
        .get<ChartResponse>(`${process.env.NEXT_PUBLIC_API_URL}/chart`)
        .then((res) => res.data),
  });
}
