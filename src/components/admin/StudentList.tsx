// components/admin/StudentList.tsx
"use client";

import { useEffect, useMemo, useState } from "react";

import deleteStudent from "@/core/services/api/use-deletestudent";
import useGetStudents from "@/core/services/api/use-getstudents";
import { TStudentCard } from "@/types";
import showToast from "@/utils/showToast";
import SearchIcon from "@mui/icons-material/Search";
import SortIcon from "@mui/icons-material/Sort";
import {
  Box,
  CircularProgress,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";

import ErrorState from "../ErrorState";
import GlassContainer from "../Glass/GlassContainer";
import LoadingScreen from "../LoadingScreen";
import ConfirmDialog from "./ConfirmDialog";
import StudentCard from "./StudentCard";

type SortKey = keyof Pick<
  TStudentCard,
  "id" | "name" | "entry" | "college" | "period"
>;
type SortDir = "asc" | "desc";

const PAGE_SIZE_OPTIONS = [6, 10, 20];

export default function StudentList() {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("id");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [pageSize, setPageSize] = useState<number>(10);
  const [page, setPage] = useState(1);
  const [students, setStudents] = useState<TStudentCard[]>([]);

  const [toDelete, setToDelete] = useState<TStudentCard | null>(null);

  const { data: s, isLoading, isError } = useGetStudents();

  useEffect(() => {
    if (s) setStudents(s);
  }, [s]);

  const filtered = useMemo(() => {
    if (!search.trim()) return students;
    const q = search.toLowerCase();
    return students.filter((s) => {
      return (
        String(s.id).includes(q) ||
        s.name.toLowerCase().includes(q) ||
        String(s.entry).includes(q) ||
        s.college.toLowerCase().includes(q) ||
        s.period.toLowerCase().includes(q)
      );
    });
  }, [students, search]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    arr.sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDir === "asc" ? aVal - bVal : bVal - aVal;
      }
      const aStr = String(aVal).toLowerCase();
      const bStr = String(bVal).toLowerCase();
      if (aStr < bStr) return sortDir === "asc" ? -1 : 1;
      if (aStr > bStr) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return arr;
  }, [filtered, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, page, pageSize]);

  useEffect(() => {
    setPage(1);
  }, [search, sortKey, sortDir, pageSize]);

  const handleConfirmDelete = async (confirmed: boolean) => {
    if (!confirmed || !toDelete) {
      setToDelete(null);
      return;
    }

    const res = await deleteStudent(toDelete.id);

    if (res.ok) {
      showToast("دانشجو با موفقیت حذف شد", "success", 3000);
      setStudents((prev) => prev.filter((s) => s.id !== toDelete.id));
    } else {
      showToast("خطا در حذف دانشجو", "error", 3000);
    }

    setToDelete(null);
  };

  if (isLoading) return <LoadingScreen />;
  if (isError || !students) return <ErrorState />;

  return (
    <GlassContainer className="rounded-lg p-4">
      <Stack spacing={2}>
        {/* کنترل‌ها */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          alignItems={{ md: "center" }}
          justifyContent="space-between"
        >
          <TextField
            placeholder="جستجو بر اساس شناسه، نام، دانشکده، دوره یا ورودی…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ maxWidth: 420 }}
          />

          <Stack direction="row" spacing={2} alignItems="center">
            <FormControl size="small" sx={{ minWidth: 160 }}>
              <InputLabel id="sort-key-label">
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <SortIcon fontSize="small" />
                  <span>مرتب‌سازی براساس</span>
                </Stack>
              </InputLabel>
              <Select
                labelId="sort-key-label"
                value={sortKey}
                label="مرتب‌سازی براساس"
                onChange={(e) => setSortKey(e.target.value as any)}
              >
                <MenuItem value="id">شناسه</MenuItem>
                <MenuItem value="name">نام</MenuItem>
                <MenuItem value="entry">ورودی</MenuItem>
                <MenuItem value="college">دانشکده</MenuItem>
                <MenuItem value="period">دوره</MenuItem>
              </Select>
            </FormControl>

            <ToggleButtonGroup
              size="small"
              exclusive
              value={sortDir}
              onChange={(_, val) => val && setSortDir(val)}
            >
              <ToggleButton value="asc">صعودی</ToggleButton>
              <ToggleButton value="desc">نزولی</ToggleButton>
            </ToggleButtonGroup>

            <FormControl
              size="small"
              sx={{
                minWidth: 120,
                display: { xs: "none", sm: "block" },
              }}
            >
              <InputLabel id="page-size-label">در هر صفحه</InputLabel>
              <Select
                labelId="page-size-label"
                value={pageSize}
                label="در هر صفحه"
                onChange={(e) => setPageSize(Number(e.target.value))}
              >
                {PAGE_SIZE_OPTIONS.map((n) => (
                  <MenuItem key={n} value={n}>
                    {n}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </Stack>

        {/* لیست (۲ ستون از md به بالا) */}
        {paged.length === 0 ? (
          <Typography color="text.secondary">دانشجویی یافت نشد.</Typography>
        ) : (
          <Box>
            <Grid container spacing={4}>
              {paged.map((s) => (
                <Grid xs={12} md={6} item key={s.id}>
                  <StudentCard student={s} onDeleteClick={setToDelete} />
                </Grid>
              ))}
            </Grid>

            {/* صفحه‌بندی */}
            <Stack alignItems="center" sx={{ pt: 2 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(_, p) => setPage(p)}
                color="primary"
              />
            </Stack>
          </Box>
        )}

        <ConfirmDialog
          open={Boolean(toDelete)}
          title="حذف دانشجو"
          message={
            toDelete
              ? `آیا از حذف دانشجو با شماره دانشجویی ${toDelete.id} (${toDelete.name}) مطمئن هستید؟`
              : ""
          }
          confirmText="حذف"
          cancelText="انصراف"
          onClose={handleConfirmDelete}
        />
      </Stack>
    </GlassContainer>
  );
}
