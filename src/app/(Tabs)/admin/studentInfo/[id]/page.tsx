// app/admin/studentInfo/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";

import useGetStudent from "@/core/services/api/use-getstudent";
import { mapCoursesToRows } from "@/utils/mapCourses";
import {
  CircularProgress,
  Container,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import BackButton from "@/components/Buttons/BackButton";
import BackButton2 from "@/components/Buttons/BackButton2";
// یک اینترفیس نمونه؛ متناسب با داده‌های API خود اصلاح کنید
import type { CourseRow } from "@/components/Chart/ChartTable";
import ErrorState from "@/components/ErrorState";
import LoadingScreen from "@/components/LoadingScreen";
import TermsDesktop from "@/components/Terms/TermsDesktop";
import TermsMobile from "@/components/Terms/TermsMobile";

// اگر مسیر ChartTable شما متفاوت است، همین ایمپورت را تنظیم کنید
const ChartTable = dynamic(() => import("@/components/Chart/ChartTable"), {
  ssr: false,
});

export default function StudentInfoPage() {
  const { id } = useParams<{ id: string }>();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const { data: student, isLoading, isError } = useGetStudent({ id: id });

  if (isLoading) return <LoadingScreen />;
  if (isError || !student) return <ErrorState />;
  if (!student.terms || student.terms.length == 0)
    return <ErrorState message="اطلاعات ترم‌ها یافت نشد." />;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }} dir="rtl">
      <Stack spacing={3}>
        <Typography variant="h4" fontWeight={700}>
          اطلاعات دانشجو
        </Typography>
        {!student ? (
          <Paper sx={{ p: 4 }}>
            <Typography>دانشجو یافت نشد.</Typography>
          </Paper>
        ) : (
          <Stack spacing={2}>
            <Typography variant="h6">
              #{student.id} — {student.name}
            </Typography>
            <BackButton2 />
            {isMobile ? (
              <TermsMobile title="ترم های گذشته و جاری" terms={student.terms} />
            ) : (
              <TermsDesktop
                title="ترم های گذشته و جاری"
                terms={student.terms}
              />
            )}
          </Stack>
        )}
      </Stack>
    </Container>
  );
}
