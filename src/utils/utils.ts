import { DayKey, WEEK_DAYS } from "@/constants";
import { DataInput, DateAndTime, DayTime, ExamTime, Row } from "@/types";
import html2canvas from "html2canvas";
import * as XLSX from "xlsx";

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

export function handleGetExcel(data: DataInput, fileName: string): void {
  const translations: Record<string, string> = {
    collegeID: "شناسه دانشکده",
    collegeName: "نام دانشکده",
    groupID: "شناسه گروه",
    groupName: "نام گروه",
    courseID: "شناسه درس",
    courseName: "نام درس",
    totalUnit: "واحد کل",
    practicalUnit: "واحد عملی",
    capacity: "ظرفیت",
    registeredCount: "تعداد ثبت نامی",
    waitListCount: "تعداد لیست انتظار",
    gender: "جنسیت",
    professor: "استاد",
    dateAndTime: "زمان و تاریخ",
    saturday: "شنبه",
    monday: "دوشنبه",
    sunday: "یک‌شنبه",
    tuesday: "سه‌شنبه",
    from: "از",
    to: "تا",
    exam: "امتحان",
    date: "تاریخ",
    time: "زمان",
    description: "توضیحات",
  };

  // Normalize input to an array of rows
  const rows: Row[] = Array.isArray(data) ? data : Object.values(data ?? {});

  // Helper: translate a key if available
  const tr = (k: string) => translations[k] || k;

  // Helper: flatten a single level of nested objects
  const flattenOneLevel = (obj: Row): Row => {
    const out: Row = {};
    Object.keys(obj).forEach((key) => {
      const val = obj[key];
      const tKey = tr(key);

      if (val && typeof val === "object" && !Array.isArray(val)) {
        // one-level flatten: parentChild => translatedParent - translatedChild
        Object.keys(val).forEach((subKey) => {
          const subVal = (val as Row)[subKey];
          out[`${tKey} - ${tr(subKey)}`] =
            subVal != null && typeof subVal === "object"
              ? JSON.stringify(subVal)
              : subVal;
        });
      } else {
        out[tKey] = val;
      }
    });
    return out;
  };

  const translatedData = rows.map(flattenOneLevel);

  // Optional: keep a consistent column order using keys from the first row
  const header =
    translatedData.length > 0 ? Object.keys(translatedData[0]) : undefined;

  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
    translatedData,
    header ? { header } : undefined
  );
  const workbook: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  const excelBuffer: ArrayBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const blob = new Blob([excelBuffer], {
    // Correct MIME type for .xlsx files
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${fileName}.xlsx`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Clean up the object URL
  URL.revokeObjectURL(link.href);
}

export const handleCapture = async (eid: string, name: string) => {
  const element = document.getElementById(eid); // give ScheduleGrid a wrapper id
  if (!element) return;

  const canvas = await html2canvas(element, {
    scale: 2, // ensures high resolution
    width: 1920,
    height: 1080,
    useCORS: true,
    backgroundColor: "#ffffff",
  });

  const link = document.createElement("a");
  link.download = `${name}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
};
