import { formatClassDateAndTime, formatExamDateAndTime } from "@/utils/utils";
import { Box, Typography } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";

export const makeColumns = (): GridColDef[] => [
  { field: "courseID", headerName: "کد درس", width: 110, cellClassName: "ltr" },
  { field: "courseName", headerName: "نام درس", width: 250 },
  { field: "professor", headerName: "استاد ارائه دهنده", width: 200 },
  {
    field: "capacity",
    headerName: "ظرفیت",
    width: 100,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "totalUnit",
    headerName: "تعداد واحد ها",
    width: 130,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "classDateAndTime",
    headerName: "زمان برگزاری",
    width: 250,
    renderCell(params) {
      return (
        <Box display="flex" flexDirection="column">
          {formatClassDateAndTime(params.row.dateAndTime).map(
            (line: string) => (
              <Typography key={line} variant="body2" sx={{ my: 0.5 }}>
                {line}
              </Typography>
            )
          )}
        </Box>
      );
    },
  },
  {
    field: "examDateAndTime",
    headerName: "زمان برگزاری امتحان",
    width: 170,
    renderCell(params) {
      return (
        <Box display="flex" flexDirection="column">
          {formatExamDateAndTime(params.row.dateAndTime).map((line: string) => (
            <Typography key={line} variant="body2" sx={{ my: 0.5 }}>
              {line}
            </Typography>
          ))}
        </Box>
      );
    },
  },
  { field: "gender", headerName: "گروه", width: 100 },
];
