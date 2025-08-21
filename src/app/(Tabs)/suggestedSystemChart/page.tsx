"use client";

import useGetUnits from "@/core/services/api/use-getunits";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import ErrorState from "@/components/ErrorState";
import LoadingScreen from "@/components/LoadingScreen";
import TermsDesktop from "@/components/Terms/TermsDesktop";
import TermsMobile from "@/components/Terms/TermsMobile";

export default function SuggestedSystemChart() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const { data: studentInfo, isLoading, isError } = useGetUnits();

  if (isLoading) return <LoadingScreen />;
  if (isError || !studentInfo) return <ErrorState />;

  const terms = studentInfo.remaining_terms;
  return isMobile ? (
    <TermsMobile isRemaining title="چارت پیشنهادی سیستم" terms={terms} />
  ) : (
    <TermsDesktop isRemaining title="چارت پیشنهادی سیستم" terms={terms} />
  );
}
