"use client";

import useGetChart from "@/core/services/api/use-getchart";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import ErrorState from "@/components/ErrorState";
import LoadingScreen from "@/components/LoadingScreen";
import TermsDesktop from "@/components/Terms/TermsDesktop";
import TermsMobile from "@/components/Terms/TermsMobile";

export default function SuggestedUniversityChart() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const { data: chartData, isLoading, isError } = useGetChart();

  if (isLoading) return <LoadingScreen />;
  if (isError || !chartData) return <ErrorState />;

  return isMobile ? (
    <TermsMobile title="چارت پیشنهادی دانشکده" terms={chartData.terms} />
  ) : (
    <TermsDesktop title="چارت پیشنهادی دانشکده" terms={chartData.terms} />
  );
}
