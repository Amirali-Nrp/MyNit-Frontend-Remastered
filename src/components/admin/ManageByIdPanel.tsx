// components/admin/ManageByIdPanel.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import deleteStudent from "@/core/services/api/use-deletestudent";
import showToast from "@/utils/showToast";
import {
  Button,
  CircularProgress,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import GlassContainer from "../Glass/GlassContainer";

export default function ManageByIdPanel() {
  const [idInput, setIdInput] = useState("");
  const [loadingDelete, setLoadingDelete] = useState(false);
  const router = useRouter();

  const onShow = () => {
    const id = Number(idInput.trim());
    if (!Number.isFinite(id)) return;
    router.push(`/admin/studentInfo/${id}`);
  };

  const onDelete = async () => {
    const id = Number(idInput.trim());
    if (!Number.isFinite(id)) return;
    if (!confirm(`آیا از حذف دانشجو با شناسه ${id} مطمئن هستید؟`)) return;

    setLoadingDelete(true);

    const res = await deleteStudent(id);
    if (res.ok) {
      showToast("دانشجو با موفقیت حذف شد", "success", 3000);
    } else {
      showToast("خطا در حذف دانشجو", "error", 3000);
    }
    setLoadingDelete(false);
  };

  return (
    <GlassContainer className="rounded-lg p-4">
      <Stack spacing={2}>
        <Typography variant="h6" fontWeight={700}>
          اقدامات سریع با شماره دانشجویی
        </Typography>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            label="شماره دانشجویی"
            value={idInput}
            onChange={(e) => setIdInput(e.target.value)}
            type="number"
            inputProps={{ min: 0 }}
            sx={{ maxWidth: 300 }}
          />

          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              onClick={onShow}
              disabled={!idInput.trim()}
            >
              نمایش
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={onDelete}
              disabled={!idInput.trim() || loadingDelete}
              startIcon={loadingDelete ? <CircularProgress size={16} /> : null}
            >
              {loadingDelete ? "در حال حذف…" : "حذف"}
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </GlassContainer>
  );
}
