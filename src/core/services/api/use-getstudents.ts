"use client";

import http from "@/core/services/interceptor/interceptor.client";
import { TStudentCard } from "@/types";
import { useQuery, type UseQueryResult } from "react-query";

export default function useGetStudents(): UseQueryResult<TStudentCard[]> {
  return useQuery<TStudentCard[]>({
    queryKey: ["students"],
    queryFn: () =>
      http
        .get<TStudentCard[]>(`${process.env.NEXT_PUBLIC_API_URL}/students`)
        .then((res) => res.data),
  });
}
