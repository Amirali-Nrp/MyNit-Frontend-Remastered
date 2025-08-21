"use client";

import * as React from "react";

import useUploadunits from "@/core/services/api/use-uploadunits";
import { buildGridFromParsed, GridColumns, GridRows } from "@/utils/gridMap";
import parseTbody from "@/utils/parseTbody";
import showToast from "@/utils/showToast";
import {
  Alert,
  Box,
  Button,
  Divider,
  Paper,
  Snackbar,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import ActionsBar from "@/components/addCourses/ActionBar";
import GradesGrid from "@/components/addCourses/GradesGrid";
import HelperNotes from "@/components/addCourses/HelperNotes";
import PasteInput from "@/components/addCourses/PasteInput";
import StatsBar from "@/components/addCourses/StatsBar";
import GlassContainer from "@/components/Glass/GlassContainer";

export default function InsertTbodyPage() {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

  const [tbodyHtml, setTbodyHtml] = React.useState("");
  const [rows, setRows] = React.useState<string[][]>([]);
  const [submitting, setSubmitting] = React.useState(false);

  const [gridColumns, setGridColumns] = React.useState<GridColumns>([]);
  const [gridRows, setGridRows] = React.useState<GridRows>([]);

  const parsed = React.useMemo(() => parseTbody(tbodyHtml), [tbodyHtml]);
  const colCount = React.useMemo(() => rows[0]?.length ?? 0, [rows]);

  const handleParse = () => {
    const { data, error } = parsed;
    if (error) {
      setRows([]);
      setGridColumns([]);
      setGridRows([]);
      showToast(error, "error", 3000);
      return;
    }
    setRows(data);
    const { cols, gridRows } = buildGridFromParsed(data);
    setGridColumns(cols);
    setGridRows(gridRows);
    showToast(`Parsed ${data.length} row(s).`, "success", 3000);
  };

  const handleClear = () => {
    setTbodyHtml("");
    setRows([]);
    setGridColumns([]);
    setGridRows([]);
  };

  const handleSubmit = async () => {
    if (!rows.length) {
      showToast(
        "هیچ داده‌ای برای ارسال وجود ندارد. لطفاً ابتدا تجزیه کنید.",
        "error",
        3000
      );
      return;
    }
    setSubmitting(true);
    const res = await useUploadunits({
      raw_html: tbodyHtml.replace(/"/g, '\\"'),
    });
    showToast(
      res.ok ? "با موفقیت ارسال شد" : res.message,
      res.ok ? "success" : "error",
      3000
    );
    setSubmitting(false);
  };

  return (
    <GlassContainer className=" mb-6 rounded-xl p-4 sm:p-6 md:p-10">
      <Stack spacing={{ xs: 1.5, sm: 2 }}>
        <Typography
          variant="h4"
          fontWeight={700}
          sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem", md: "2rem" } }} // ← تیتر کوچکتر در موبایل
        >
          افزودن اطلاعات دروس
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ fontSize: { xs: "0.9rem", sm: "1rem" } }}
        >
          {
            "برای بروزرسانی اطلاعات خود، تگ <tbody>...</tbody> کپی شده ی خود را وارد کنید."
          }
        </Typography>

        <Paper variant="outlined" sx={{ p: { xs: 1.5, sm: 2 } }}>
          <Stack spacing={{ xs: 1.5, sm: 2 }}>
            {/* اگر PasteInput شما props minRows/maxRows را می‌پذیرد، این‌ها را هم بدهید */}
            <PasteInput
              value={tbodyHtml}
              onChange={setTbodyHtml} /* minRows={isXs ? 6 : 8} maxRows={20} */
            />
            <ActionsBar
              onParse={handleParse}
              onClear={handleClear}
              submitting={submitting}
              disabledSubmit={!rows.length}
              onSubmit={handleSubmit}
            />
          </Stack>
        </Paper>

        {/* چیپ‌ها بتوانند بشکنند و جمع‌وجور شوند */}
        <Box sx={{ "& > *": { width: "100%" } }}>
          <StatsBar rowCount={rows.length} colCount={colCount} />
        </Box>

        {/* ارتفاع گرید واکنش‌گرا: موبایل 45vh، بقیه 50vh */}
        <Box
          sx={{
            mt: 2,
            height: { xs: "45vh", sm: "50vh" },
            minHeight: 320,
          }}
        >
          <GradesGrid rows={gridRows} columns={gridColumns} />
        </Box>

        <Divider sx={{ my: { xs: 1.5, sm: 2 } }} />
        <HelperNotes />
      </Stack>
    </GlassContainer>
  );
}
