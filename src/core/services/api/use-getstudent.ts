"use client";

import http from "@/core/services/interceptor/interceptor.client";
import { TSudentInfo } from "@/types";
import { useQuery, type UseQueryResult } from "react-query";

export default function useGetStudent({
  id,
}: {
  id: number | string;
}): UseQueryResult<TSudentInfo> {
  return useQuery<TSudentInfo>({
    queryKey: ["student", id],
    queryFn: () =>
      http
        .post<TSudentInfo>(`${process.env.NEXT_PUBLIC_API_URL}/students`, {
          id: id,
        })
        .then((res) => res.data),
  });
}
