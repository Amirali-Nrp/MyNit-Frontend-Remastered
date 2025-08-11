import React, { useMemo } from "react";

import { Eligible } from "@/types";
import { Box, CircularProgress, Tab, Tabs, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { makeColumns } from "../WeeklyPlanner/MakeCulomns";

interface CourseSelectionProps {
  tab: number;
  rows: Eligible[];
  setTab: (value: number) => void;
  addCourse: (course: Eligible) => void;
  removeCourse: (course: Eligible) => void;
  selected: Eligible[];
  isLoading: boolean;
}

export default function CourseSelection({
  tab,
  setTab,
  addCourse,
  removeCourse,
  rows,
  selected,
  isLoading,
}: CourseSelectionProps) {
  const columns = useMemo(() => makeColumns(), []);
  const selectedIDs = useMemo(
    () => selected.map((s) => s.courseID),
    [selected]
  );

  const handleSelectionChange = (newModel: (string | number)[]) => {
    const current = selectedIDs;
    const added = newModel.filter(
      (id) => !current.map(String).includes(String(id))
    );
    const removed = current.filter(
      (id) => !newModel.map(String).includes(String(id))
    );

    added.forEach((id) => {
      const course = rows.find((r) => r.courseID === id);
      if (course) addCourse(course);
    });

    removed.forEach((id) => {
      const course = rows.find((r) => r.courseID === id);
      if (course) removeCourse(course);
    });
  };

  return (
    <>
      {" "}
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        aria-label="course categories"
        scrollButtons
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          "& .Mui-selected": {
            color: "#0f172a !important",
          },
          "& .MuiTabs-indicator": {
            backgroundColor: "#0f172a",
          },
        }}
      >
        <Tab label="تخصصی" />
        <Tab label="علوم پایه" />
        <Tab label="عمومی" />
        <Tab label="تربیت بدنی و ورزش" />
      </Tabs>
      {isLoading ? (
        <Box className="flex h-full items-center justify-center">
          <CircularProgress sx={{ color: "#0f172a" }} />
        </Box>
      ) : (
        <DataGrid
          getRowId={(row) => row.courseID}
          rows={rows}
          columns={columns}
          disableRowSelectionOnClick
          hideFooterPagination
          hideFooter
          disableColumnMenu
          checkboxSelection
          rowSelectionModel={selectedIDs}
          onRowSelectionModelChange={handleSelectionChange}
          onRowClick={(params) => {
            const id = params.id;
            let newModel;
            if (selectedIDs.map(String).includes(String(id))) {
              newModel = selectedIDs.filter((i) => String(i) !== String(id));
            } else {
              newModel = [...selectedIDs, id];
            }
            handleSelectionChange(newModel);
          }}
          slots={{
            noRowsOverlay: () => (
              <Typography sx={{ p: 2 }}>موردی یافت نشد.</Typography>
            ),
          }}
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              bgcolor: "#0f172a",
              color: "#fff",
              fontWeight: 700,
            },
            "& .MuiDataGrid-row:nth-of-type(odd)": { bgcolor: "#ffffff" },
            "& .MuiDataGrid-row:nth-of-type(even)": { bgcolor: "#f8fafc" },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#e0e7ef",
            },
            "& .Mui-selected": {
              backgroundColor: "#c7d2fe !important",
            },
            "& .MuiDataGrid-columnHeader, & .MuiDataGrid-columnHeader .MuiSvgIcon-root":
              {
                color: "#fff",
              },
            // Checkbox color customization
            "& .MuiCheckbox-root.Mui-checked": {
              color: "#0f172a !important",
            },
            "& .MuiCheckbox-root.MuiCheckbox-indeterminate": {
              color: "#0f172a !important",
            },
            bgcolor: "#fff",
          }}
        />
      )}
    </>
  );
}
