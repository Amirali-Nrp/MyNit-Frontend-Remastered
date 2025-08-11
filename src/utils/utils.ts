import { DayKey, WEEK_DAYS } from "@/constants";
import { DateAndTime, DayTime, ExamTime } from "@/types";

export const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map((n) => parseInt(n, 10));
  return h * 60 + m;
};

export const rangesOverlap = (
  aFrom: string,
  aTo: string,
  bFrom: string,
  bTo: string
) => {
  const a1 = toMinutes(aFrom);
  const a2 = toMinutes(aTo);
  const b1 = toMinutes(bFrom);
  const b2 = toMinutes(bTo);
  return Math.max(a1, b1) < Math.min(a2, b2);
};

export const examRange = (exam?: ExamTime) => {
  if (!exam?.time) return { from: 0, to: 0 };
  const [f, t] = exam.time.split("-");
  return { from: toMinutes(f), to: toMinutes(t) };
};

export const formatClassDateAndTime = (dt: DateAndTime) => {
  const out: string[] = [];
  WEEK_DAYS.forEach(({ key, label }) => {
    const d = (dt as any)[key] as DayTime | undefined;
    if (d) out.push(`${label} ${d.from} تا ${d.to}`);
  });
  return out;
};

export const formatExamDateAndTime = (dt: DateAndTime) => {
  const e = dt.exam;
  if (!e) return [] as string[];
  return [`${e.date}`, `${e.time.replace("-", " تا ")}`];
};

// parse group number from courseID (after underscore)
export const parseGroup = (courseID: string) => {
  const parts = courseID.split("_");
  return parts[1] || "";
};

export const dayLabel = (k: DayKey) =>
  WEEK_DAYS.find((d) => d.key === k)?.label ?? "";
