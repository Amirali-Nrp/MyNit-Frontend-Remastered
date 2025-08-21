"use client";

import http from "@/core/services/interceptor/interceptor.client";
import type { AxiosError } from "axios";

type TChooseUnitsResult = { ok: boolean; message: string };

export default async function useChooseUnits({
  ids,
}: {
  ids: number[] | string[];
}): Promise<TChooseUnitsResult> {
  try {
    const res = await http.put<string>(
      `${process.env.NEXT_PUBLIC_API_URL}/units/choose`,
      { selected: ids }
    );
    // 200 → body is a simple string
    return { ok: true, message: res.data };
  } catch (err) {
    let message = "Upload failed";

    const ax = err as AxiosError<any>;
    if (ax?.response) {
      if (ax.response.status === 422) {
        const detail = ax.response.data?.detail as
          | { loc: (string | number)[]; msg: string; type: string }[]
          | undefined;

        if (Array.isArray(detail) && detail.length) {
          message = detail
            .map(
              (d) =>
                `${Array.isArray(d.loc) ? d.loc.join(".") : d.loc}: ${d.msg}`
            )
            .join(" | ");
        } else {
          message = "Validation error (422)";
        }
      } else if (typeof ax.response.data === "string") {
        message = ax.response.data;
      } else if (typeof ax.response.data?.message === "string") {
        message = ax.response.data.message;
      }
    } else if (ax?.message) {
      message = ax.message;
    }

    return { ok: false, message };
  }
}
