function normalizeCell(s: string | undefined | null): string {
  return (s ?? "")
    .replace(/\u00A0/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export default function parseTbody(input: string): {
  data: string[][];
  error?: string;
} {
  const trimmed = (input || "").trim();
  if (!trimmed) return { data: [], error: "ورودی خالی است." };

  const lower = trimmed.toLowerCase();
  const hasOpenTbody = lower.includes("<tbody");
  const hasCloseTbody = lower.includes("</tbody>");
  const wrappedHtml =
    hasOpenTbody && hasCloseTbody
      ? `<table>${trimmed}</table>`
      : `<table><tbody>${trimmed}</tbody></table>`;

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(wrappedHtml, "text/html");
    const tbody = doc.querySelector("table tbody");
    if (!tbody)
      return { data: [], error: "المان <tbody> داخل <table> یافت نشد." };

    const out: string[][] = [];
    tbody.querySelectorAll("tr").forEach((tr) => {
      const cells = Array.from(tr.querySelectorAll<HTMLElement>("th,td")).map(
        (el) => normalizeCell(el.innerText)
      );
      if (cells.length) out.push(cells);
    });

    if (!out.length)
      return { data: [], error: "هیچ سطر <tr> با سلول <td>/<th> یافت نشد." };
    return { data: out };
  } catch (e: any) {
    return { data: [], error: e?.message || "تجزیه HTML ناموفق بود." };
  }
}
