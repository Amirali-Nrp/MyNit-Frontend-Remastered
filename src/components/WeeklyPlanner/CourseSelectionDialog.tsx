import { useMemo } from "react";

import { Eligible } from "@/types";
import {
  Box,
  Dialog,
  DialogContent,
  IconButton,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { X } from "lucide-react";

import { makeColumns } from "./MakeCulomns";

interface CourseSelectionDialogProps {
  open: boolean;
  onClose: () => void;
  tab: number;
  setTab: (value: number) => void;
  compatibleRows: Eligible[];
  addCourse: (course: Eligible) => void;
}

export default function CourseSelectionDialog({
  open,
  onClose,
  tab,
  setTab,
  compatibleRows,
  addCourse,
}: CourseSelectionDialogProps) {
  const columns = useMemo(() => makeColumns(), []);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        px={2}
        pt={1}
      >
        <Typography fontWeight={700}>انتخاب درس</Typography>
        <IconButton onClick={onClose}>
          <X />
        </IconButton>
      </Box>
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        aria-label="course categories"
        variant="scrollable"
        scrollButtons
      >
        <Tab label="تخصصی" />
        <Tab label="علوم پایه" />
        <Tab label="عمومی" />
        <Tab label="تربیت بدنی و ورزش" />
      </Tabs>
      <DialogContent sx={{ height: 520 }}>
        <Box height="100%">
          <DataGrid
            getRowId={(row) => row.courseID}
            rows={compatibleRows}
            columns={columns}
            disableRowSelectionOnClick
            hideFooterPagination
            hideFooter
            disableColumnMenu
            onRowClick={(p) => addCourse(p.row as Eligible)}
            slots={{
              noRowsOverlay: () => (
                <Typography sx={{ p: 2 }}>
                  موردی برای این بازه زمانی یافت نشد.
                </Typography>
              ),
            }}
            sx={{
              borderRadius: 2,
              "& .MuiDataGrid-columnHeaders": {
                bgcolor: "#0f172a",
                color: "#fff",
                fontWeight: 700,
              },
              "& .MuiDataGrid-row:nth-of-type(odd)": { bgcolor: "#ffffff" },
              "& .MuiDataGrid-row:nth-of-type(even)": { bgcolor: "#f8fafc" },
            }}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
}
