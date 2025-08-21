"use client";

import React, { useMemo, useState } from "react";

import { DayKey, TIME_SLOTS, WEEK_DAYS } from "@/constants";
import useChooseUnits from "@/core/services/api/use-chooseunits";
import useGetUnits from "@/core/services/api/use-getunits";
import { useWeeklyPlanStorage } from "@/storage/storage";
import { DayTime, Eligible } from "@/types";
import showToast from "@/utils/showToast";
import {
  dayLabel,
  examRange,
  handleCapture,
  handleGetExcel,
  parseGroup,
  rangesOverlap,
} from "@/utils/utils";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";

import ErrorState from "@/components/ErrorState";
import LoadingScreen from "@/components/LoadingScreen";
import CourseSelectionDialog from "@/components/WeeklyPlanner/CourseSelectionDialog";
import ScheduleGrid from "@/components/WeeklyPlanner/ScheduleGrid";
import SelectedCoursesList from "@/components/WeeklyPlanner/SelectedCoursesList";
import SelectedExamsList from "@/components/WeeklyPlanner/SelectedExamsList";
import UsageHints from "@/components/WeeklyPlanner/UsageHints";

export default function WeeklyCoursePlanner() {
  const { data, isError, isLoading } = useGetUnits();

  const courses: Eligible[] | undefined = data?.eligibles;

  const { selected, setSelected } = useWeeklyPlanStorage();

  const [cellAnchor, setCellAnchor] = useState<{
    day: DayKey;
    slot: number;
  } | null>(null);
  const [tab, setTab] = useState(0);
  const [isChoosing, setIsChoosing] = useState(false);

  const byCategory = useMemo(() => {
    const specialty = courses?.filter((c) => c.collegeID === "12") ?? [];
    const basic = courses?.filter((c) => c.collegeID === "11") ?? [];
    const general = courses?.filter((c) => c.collegeID === "16") ?? [];
    const sport = courses?.filter((c) => c.collegeID === "29") ?? [];
    return [specialty, basic, general, sport] as [
      Eligible[],
      Eligible[],
      Eligible[],
      Eligible[],
    ];
  }, [courses]);

  const handleOpen = (day: DayKey, slotIdx: number) =>
    setCellAnchor({ day, slot: slotIdx });
  const handleClose = () => setCellAnchor(null);

  const compatibleRows = useMemo(() => {
    if (!cellAnchor) return [] as Eligible[];
    const { day, slot } = cellAnchor;
    const slotRange = TIME_SLOTS[slot];

    const filterByTime = (arr: Eligible[]) =>
      arr.filter((r) => {
        const dt = (r.dateAndTime as any)[day] as DayTime | undefined;
        if (!dt) return false;
        return rangesOverlap(dt.from, dt.to, slotRange.from, slotRange.to);
      });

    return byCategory[tab] ? filterByTime(byCategory[tab]) : [];
  }, [byCategory, cellAnchor, tab]);

  type ClassConflict = { other: Eligible; day: DayKey };
  const findClassConflicts = (candidate: Eligible): ClassConflict[] => {
    const conflicts: ClassConflict[] = [];
    const entries = Object.values(selected);
    for (const other of entries) {
      for (const { key: dKey } of WEEK_DAYS) {
        const a = (candidate.dateAndTime as any)[dKey] as DayTime | undefined;
        const b = (other.dateAndTime as any)[dKey] as DayTime | undefined;
        if (a && b && rangesOverlap(a.from, a.to, b.from, b.to)) {
          conflicts.push({ other, day: dKey });
        }
      }
    }
    return conflicts;
  };

  type ExamConflict = { other: Eligible };
  const findExamConflicts = (candidate: Eligible): ExamConflict[] => {
    const conflicts: ExamConflict[] = [];
    const e1 = candidate.dateAndTime.exam;
    if (!e1) return conflicts;
    const r1 = examRange(e1);
    for (const s of Object.values(selected)) {
      if (s.dateAndTime.exam?.date !== e1.date) continue;
      const r2 = examRange(s.dateAndTime.exam);
      if (Math.max(r1.from, r2.from) < Math.min(r1.to, r2.to)) {
        conflicts.push({ other: s });
      }
    }
    return conflicts;
  };

  const addCourse = (course: Eligible) => {
    if (
      Object.values(selected).some(
        (sel) => sel.courseID.split("_")[0] === course.courseID.split("_")[0]
      )
    ) {
      showToast("این درس قبلاً اضافه شده است.", "error", 3000);
      return;
    }

    const classConf = findClassConflicts(course);
    if (classConf.length > 0) {
      const msg = `تداخل زمانی کلاس با: ${classConf
        .map(
          (c) =>
            `${c.other.courseName} (گروه ${parseGroup(c.other.courseID)}) در ${dayLabel(c.day)}`
        )
        .join("، ")}`;
      showToast(msg, "error", 3000);
      return;
    }

    const examConf = findExamConflicts(course);
    if (examConf.length > 0) {
      const msg = `تداخل امتحان با: ${examConf
        .map(
          (c) =>
            `${c.other.courseName} (${c.other.dateAndTime.exam?.date} ${c.other.dateAndTime.exam?.time})`
        )
        .join("، ")}`;
      showToast(msg, "error", 3000);
      return;
    }

    setSelected((p) => ({ ...p, [course.courseID]: course }));
    showToast("درس با موفقیت اضافه شد.", "success", 3000);
    handleClose();
  };

  const removeCourse = (courseID: string) => {
    setSelected((p) => {
      const s = { ...p };
      delete s[courseID];
      return s;
    });
  };

  const handleSave = async () => {
    // Save the selected courses
    setIsChoosing(true);
    const ids = Object.values(selected).map((data) => data.courseID);
    const res = await useChooseUnits({ ids });
    if (res.ok) {
      showToast("دروس با موفقیت ثبت شدند.", "success", 3000);
    } else {
      showToast("خطا در ثبت دروس. لطفاً دوباره تلاش کنید.", "error", 3000);
    }
    handleGetExcel(Object.values(selected), "لیست-دروس");
    handleCapture("schedule-grid", "برنامه-هفتگی");
    setIsChoosing(false);
  };

  if (isLoading) return <LoadingScreen />;

  if (isError) return <ErrorState message="خطا در بارگذاری اطلاعات دروس." />;

  return (
    <Stack
      spacing={2}
      dir="rtl"
      sx={{ width: "100%", fontFamily: "Vazirmatn" }}
    >
      <Box>
        <Typography
          variant="h4"
          fontWeight={700}
          sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem", md: "2rem" } }} // ← تیتر کوچکتر در موبایل
        >
          پیش ثبت نام
        </Typography>
        <Typography variant="body2" color="text.secondary">
          چینش برنامه هفتگی دلخواه برای ترم آینده
        </Typography>
      </Box>
      <div id="schedule-grid">
        <ScheduleGrid
          selected={selected}
          removeCourse={removeCourse}
          handleOpen={handleOpen}
        />
      </div>
      <CourseSelectionDialog
        open={!!cellAnchor}
        onClose={handleClose}
        tab={tab}
        setTab={setTab}
        compatibleRows={compatibleRows}
        addCourse={addCourse}
      />
      {Object.values(selected).length > 0 && (
        <SelectedCoursesList selected={selected} />
      )}
      {Object.values(selected).length > 0 && (
        <SelectedExamsList selected={selected} removeCourse={removeCourse} />
      )}
      <Button
        variant="contained"
        sx={{
          bgcolor: "primary.dark",
          "&:hover": {
            bgcolor: "primary.main",
          },
        }}
        fullWidth
        onClick={handleSave}
        disabled={isChoosing || Object.keys(selected).length === 0}
      >
        {isChoosing ? (
          <CircularProgress sx={{ color: "#fff" }} size={24} />
        ) : (
          "ذخیره برنامه"
        )}
      </Button>
      <UsageHints />
    </Stack>
  );
}
