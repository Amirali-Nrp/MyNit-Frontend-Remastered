"use client";

import http from "@/core/services/interceptor/interceptor.client";
import { plan } from "@/types";

export default async function deleteStudent(id: number): Promise<{
  ok: boolean;
}> {
  try {
    const response = await http.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/delete`,
      { params: { target: id } }
    );
    return { ok: true };
  } catch (error) {
    return { ok: false };
  }
}
