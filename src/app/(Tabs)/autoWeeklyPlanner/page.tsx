"use client";

import React, { useMemo, useState } from "react";

import useGetPlans from "@/core/services/api/use-getplans";
import useGetUnits from "@/core/services/api/use-getunits";
import { usePlanNumStorage, usePlansStorage } from "@/storage/storage";
import { Eligible, plan } from "@/types";
import showToast from "@/utils/showToast";
import { Box, Button, CircularProgress } from "@mui/material";

import AutoPlannerHelp from "@/components/AutoWeeklyPlanner/AutoPlannerHelp";
import CourseSelection from "@/components/AutoWeeklyPlanner/CourseSelection";
import ScheduleTable from "@/components/AutoWeeklyPlanner/ScheduleTable";
import SelectedCoursesList from "@/components/WeeklyPlanner/SelectedCoursesList";

export default function page() {
  const { data, isError, isLoading } = useGetUnits();

  const courses: Eligible[] | undefined = data?.eligibles;

  const [tab, setTab] = useState(0);

  const [selected, setSelected] = useState<Record<string, Eligible>>({});

  const { plans, setPlans } = usePlansStorage();

  const { planNum, setPlanNum } = usePlanNumStorage();

  const [isLoadingPlans, setIsLoadingPlans] = useState(false);

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

  const addCourse = (course: Eligible) => {
    setSelected((p) => ({ ...p, [course.courseID]: course }));
  };

  const removeCourse = (course: Eligible) => {
    setSelected((p) => {
      const updated = { ...p };
      delete updated[course.courseID];
      return updated;
    });
  };

  const getPlans = async () => {
    setIsLoadingPlans(true);
    if (Object.keys(selected).length === 0) {
      showToast("لطفا دروس مورد نظر خود را انتخاب کنید.", "error", 3000);
      setIsLoadingPlans(false);
      return;
    }

    const totalUnits = Object.values(selected).reduce(
      (sum, course) => sum + course.totalUnit,
      0
    );

    if (totalUnits < 12) {
      showToast("تعداد واحدهای انتخابی باید حداقل ۱۲ باشد.", "error", 3000);
      setIsLoadingPlans(false);
      return;
    }

    const res = await useGetPlans({
      courses: Object.values(selected),
    });

    if (res.ok) {
      res.data && setPlans(res.data);
    } else {
      showToast("خطا در دریافت برنامه‌ها.", "error", 3000);
    }
    setIsLoadingPlans(false);
  };

  const handleNextPlan = () => {
    setPlanNum((prev) => (prev + 1) % plans.length);
  };

  const handlePrevPlan = () => {
    setPlanNum((prev) => (prev - 1 + plans.length) % plans.length);
  };

  const handleResetPlan = () => {
    setPlanNum(0);
    setPlans([]);
  };

  return (
    <>
      {plans.length !== 0 ? (
        <Box className="flex flex-col">
          <ScheduleTable
            selected={Object.fromEntries(
              plans[planNum].courses.map((course) => [course.courseID, course])
            )}
          />
          <Box className="mt-4 flex gap-2">
            <Button
              sx={{
                bgcolor: "#0f172a",
                "&:hover": {
                  bgcolor: "#334155",
                },
              }}
              variant="contained"
              onClick={handlePrevPlan}
            >
              قبلی
            </Button>
            <Button
              sx={{
                bgcolor: "#0f172a",
                "&:hover": {
                  bgcolor: "#334155",
                },
              }}
              variant="contained"
              onClick={handleNextPlan}
            >
              بعدی
            </Button>
            <Button
              sx={{
                bgcolor: "#0f172a",
                "&:hover": {
                  bgcolor: "#334155",
                },
              }}
              variant="contained"
              onClick={handleResetPlan}
            >
              بازنشانی
            </Button>
          </Box>
          {Object.values(selected).length > 0 && (
            <SelectedCoursesList
              selected={Object.fromEntries(
                plans[planNum].courses.map((course) => [
                  course.courseID,
                  course,
                ])
              )}
            />
          )}
        </Box>
      ) : (
        <Box className="flex h-5/6 flex-col gap-5 p-12">
          <CourseSelection
            tab={tab}
            setTab={setTab}
            rows={byCategory[tab]}
            addCourse={addCourse}
            removeCourse={removeCourse}
            selected={Object.values(selected)}
            isLoading={isLoading}
          />
          <Button
            variant="contained"
            sx={{
              bgcolor: "#0f172a",
              "&:hover": {
                bgcolor: "#334155",
              },
            }}
            onClick={getPlans}
            disabled={isLoading}
          >
            {isLoadingPlans ? (
              <CircularProgress sx={{ color: "#fff" }} size={24} />
            ) : (
              "برنامه‌ریزی هفتگی"
            )}
          </Button>
        </Box>
      )}
      <AutoPlannerHelp />
    </>
  );
}
