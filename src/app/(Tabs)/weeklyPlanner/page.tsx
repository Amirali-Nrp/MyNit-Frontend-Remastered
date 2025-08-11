"use client";

import React, { useMemo, useState } from "react";

import { DayKey, TIME_SLOTS, WEEK_DAYS } from "@/constants";
import useGetUnits from "@/core/services/api/use-getunits";
import { useWeeklyPlanStorage } from "@/storage/storage";
import { DayTime, Eligible } from "@/types";
import showToast from "@/utils/showToast";
import { dayLabel, examRange, parseGroup, rangesOverlap } from "@/utils/utils";
import { Box, CircularProgress, Typography } from "@mui/material";

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

  if (isLoading) {
    return (
      <Box className="flex h-full items-center justify-center">
        <CircularProgress sx={{ color: "#0f172a" }} />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box p={4} textAlign="center">
        <Typography color="error">خطا در بارگذاری داده‌ها</Typography>
      </Box>
    );
  }

  return (
    <Box dir="rtl" sx={{ width: "100%", fontFamily: "Vazirmatn" }}>
      <ScheduleGrid
        selected={selected}
        removeCourse={removeCourse}
        handleOpen={handleOpen}
      />
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
      <UsageHints />
    </Box>
  );
}
