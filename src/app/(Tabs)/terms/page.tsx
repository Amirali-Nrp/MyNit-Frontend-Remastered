"use client";

import useGetUnits from "@/core/services/api/use-getunits";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import ErrorState from "@/components/ErrorState";
import LoadingScreen from "@/components/LoadingScreen";
import TermsDesktop from "@/components/Terms/TermsDesktop";
import TermsMobile from "@/components/Terms/TermsMobile";

export default function TermsPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const { data: studentInfo, isLoading, isError } = useGetUnits();

  if (isLoading) return <LoadingScreen />;
  if (isError || !studentInfo) return <ErrorState />;

  const terms = studentInfo.terms;
  return isMobile ? (
    <TermsMobile title="ترم های گذشته و جاری" terms={terms} />
  ) : (
    <TermsDesktop title="ترم های گذشته و جاری" terms={terms} />
  );
}
