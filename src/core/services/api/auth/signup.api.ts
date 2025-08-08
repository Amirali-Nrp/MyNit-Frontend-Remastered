"use server";

import http from "@/core/services/interceptor";
import { signUpResponseSchema } from "@/validation/zod";

type Ok<T> = { ok: true; data: T };
type Err = { ok: false; status?: number; message: string; raw?: unknown };

function extractServerMessage(data: unknown): string | undefined {
  if (!data) return;
  if (typeof data === "string") return data;
  if (typeof data === "object") {
    const o = data as Record<string, unknown>;
    if (typeof o.fa === "string") return o.fa;
    if (typeof o.en === "string") return o.en;
    if (typeof o.detail === "string") return o.detail;
    if (typeof o.message === "string") return o.message;
    for (const v of Object.values(o)) {
      if (typeof v === "string") return v;
      if (Array.isArray(v) && typeof v[0] === "string") return v[0];
    }
  }
}

export const signup = async (
  id: string,
  name: string,
  password: string
): Promise<Ok<unknown> | Err> => {
  const response = await http.post(
    "/signup",
    { id, name, password },
    // <-- key line: don't throw on non-2xx
    { validateStatus: () => true }
  );

  // Handle server-side errors first
  if (response.status >= 400) {
    const message =
      extractServerMessage(response.data) ||
      `Request failed (${response.status}).`;
    return { ok: false, status: response.status, message, raw: response.data };
  }

  // Then validate successful payload
  const parsed = signUpResponseSchema.safeParse(response.data);
  if (!parsed.success) {
    return {
      ok: false,
      message: "Unexpected response format.",
      raw: { responseData: response.data, issues: parsed.error.issues },
    };
  }

  return { ok: true, data: parsed.data };
};
