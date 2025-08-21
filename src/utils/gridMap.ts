import { GridColDef } from "@mui/x-data-grid";

export type GridColumns = GridColDef[];
export type GridRows = any[];

/** ستون‌های فارسی + نگاشت ایندکس‌های tbody به فیلدهای Grid */
export function buildGridFromParsed(data: string[][]): {
  cols: GridColumns;
  gridRows: GridRows;
} {
  const cols: GridColDef[] = [
    {
      field: "codeGroup",
      headerName: "شماره و گروه درس",
      flex: 1,
      minWidth: 160,
      sortable: true,
    },
    {
      field: "title",
      headerName: "نام درس",
      flex: 1.6,
      minWidth: 220,
      sortable: true,
    },
    {
      field: "semester",
      headerName: "ترم",
      flex: 0.6,
      minWidth: 110,
      sortable: true,
    },
    {
      field: "units",
      headerName: "واحد",
      flex: 0.6,
      minWidth: 110,
      sortable: true,
    },
    {
      field: "score",
      headerName: " نمره",
      flex: 0.6,
      minWidth: 110,
      sortable: true,
    },
    {
      field: "courseType",
      headerName: "نوع درس",
      flex: 0.8,
      minWidth: 120,
      sortable: true,
    },
    {
      field: "courseStatus",
      headerName: "وضع درس",
      flex: 0.8,
      minWidth: 120,
      sortable: true,
    },
    {
      field: "gradeStatus",
      headerName: "وضع نمره",
      flex: 0.8,
      minWidth: 120,
      sortable: true,
    },
    {
      field: "gradeResult",
      headerName: "نتیجه نمره",
      flex: 0.8,
      minWidth: 120,
      sortable: true,
    },
  ];

  const gridRows = data.map((arr, idx) => ({
    id: idx + 1,
    codeGroup: arr[0] ?? "",
    title: arr[1] ?? "",
    semester: arr[2] ?? "",
    units: arr[3] ?? "",
    score: arr[4] ?? "",
    courseType: arr[5] ?? "",
    courseStatus: arr[6] ?? "",
    gradeStatus: arr[7] ?? "",
    gradeResult: arr[8] ?? "",
  }));

  return { cols, gridRows };
}
