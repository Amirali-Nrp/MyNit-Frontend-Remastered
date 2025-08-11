export const WEEK_DAYS = [
  { key: "saturday", label: "شنبه" },
  { key: "sunday", label: "یکشنبه" },
  { key: "monday", label: "دوشنبه" },
  { key: "tuesday", label: "سه‌شنبه" },
  { key: "wednesday", label: "چهارشنبه" },
] as const;

export const TIME_SLOTS: {
  id: number;
  from: string;
  to: string;
  label: string;
}[] = [
  { id: 0, from: "08:00", to: "09:30", label: "8:00 / 9:30" },
  { id: 1, from: "10:00", to: "11:30", label: "10:00 / 11:30" },
  { id: 2, from: "13:30", to: "15:00", label: "13:30 / 15:00" },
  { id: 3, from: "15:30", to: "17:00", label: "15:30 / 17:00" },
  { id: 4, from: "17:30", to: "19:00", label: "17:30 / 19:00" },
  // { id: 5, from: "19:00", to: "21:30", label: "19:00 / 21:30" },
];

export type DayKey = (typeof WEEK_DAYS)[number]["key"];
