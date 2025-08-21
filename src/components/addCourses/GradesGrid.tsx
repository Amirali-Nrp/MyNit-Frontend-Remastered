// components/AddCourses/GradesGrid.tsx
import * as React from "react";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export default function GradesGrid({
  rows,
  columns,
}: {
  rows: any[];
  columns: GridColDef[];
}) {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      hideFooter
      density={isXs ? "compact" : "standard"} // ← موبایل فشرده‌تر
      columnHeaderHeight={isXs ? 48 : 56}
      rowHeight={isXs ? 44 : 52}
      disableColumnMenu
      disableColumnFilter
      disableColumnSelector
      localeText={{ noRowsLabel: "داده‌ای برای نمایش نیست" } as any}
      sx={{
        height: "100%",
        bgcolor: "#ffffff",
        "& .MuiDataGrid-columnHeaders": {
          bgcolor: "primary.dark",
          color: "#ffffff",
        },
        "& .MuiDataGrid-columnHeaderTitle": {
          color: "#ffffff",
          fontWeight: 600,
        },
        "& .MuiSvgIcon-root": { color: "#ffffff" },
        "& .MuiDataGrid-sortIcon": { color: "#ffffff" },
        "& .MuiDataGrid-menuIcon": { color: "#ffffff" },
        "& .MuiCheckbox-root svg": { fill: "#ffffff" },
      }}
    />
  );
}
