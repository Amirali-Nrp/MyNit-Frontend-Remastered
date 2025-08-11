"use client";

import http from "@/core/services/interceptor/interceptor.client";
import { Eligible, plan } from "@/types";

export default async function getPlans({
  courses,
}: {
  courses: Eligible[];
}): Promise<{ ok: boolean; data: plan[] | null }> {
  try {
    const response = await http.put<plan[]>(
      `${process.env.NEXT_PUBLIC_API_URL}/units`,
      { courses }
    );
    return { ok: true, data: response.data };
  } catch (error) {
    console.error("Error fetching plans:", error);
    return { ok: false, data: null };
  }
}
