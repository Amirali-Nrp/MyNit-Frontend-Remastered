"use client";

import http from "@/core/services/interceptor/interceptor.client";
import { Student } from "@/types";
import { useQuery, type UseQueryResult } from "react-query";

export default function useGetUnits(): UseQueryResult<Student> {
  return useQuery<Student>({
    queryKey: ["units"],
    queryFn: () =>
      http
        .get<Student>(`${process.env.NEXT_PUBLIC_API_URL}/units`)
        .then((res) => res.data),
  });
}
