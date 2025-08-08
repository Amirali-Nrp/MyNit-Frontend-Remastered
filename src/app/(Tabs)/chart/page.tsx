// pages/index.tsx
"use client";

import React, { useState } from "react";

import useGetUnits from "@/core/services/api/use-getunits";
import { Course, Reqs, Term } from "@/types";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SchoolIcon from "@mui/icons-material/School";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";

import ChartTable, { CourseRow } from "@/components/Chart/ChartTable";
import GlassContainer from "@/components/Glass/GlassContainer";

export default function HomePage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const { data: studentInfo, isLoading, isError } = useGetUnits();
  const [selectedTerm, setSelectedTerm] = useState<number | null>(null);

  const mapCourses = (courses: Course[]): CourseRow[] =>
    courses.map((c) => ({
      id: c.id.toString(),
      name: c.name,
      units: c.units,
      pre_reqs: c.pre_reqs.map((pr: Reqs) => pr.id.toString()).join(", "),
      co_reqs: c.co_reqs.map((cr: Reqs) => cr.id.toString()).join(", "),
      passed: c.passed,
      mark: c.mark?.toString(),
      isRemaining: false,
    }));

  if (isLoading) {
    return (
      <Box className="flex h-screen items-center justify-center">
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !studentInfo) {
    return (
      <Container>
        <Box className="py-16 text-center">
          <Typography color="error" variant="h6">
            خطا در دریافت اطلاعات دانشجو!
          </Typography>
        </Box>
      </Container>
    );
  }

  // ─── MOBILE VIEW ──────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <GlassContainer className="rounded-lg p-8">
        <Box textAlign="center" mb={4}>
          <Typography variant="h5" fontWeight="bold">
            نمودار دروس ترم‌ها
          </Typography>
        </Box>

        {selectedTerm == null ? (
          <List component="nav">
            {studentInfo.terms.map((term: Term) => (
              <ListItemButton
                key={term.term_number}
                onClick={() => setSelectedTerm(term.term_number)}
                sx={{
                  mb: 1,
                  borderRadius: 2,
                  bgcolor: "background.paper",
                  "&:hover": { bgcolor: "grey.100" },
                }}
              >
                <ListItemIcon>
                  <SchoolIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={`ترم ${term.term_number}`}
                  primaryTypographyProps={{
                    variant: "subtitle1",
                    fontWeight: "medium",
                    className: "text-black",
                  }}
                />
              </ListItemButton>
            ))}
          </List>
        ) : (
          <>
            <Box mb={2}>
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={() => setSelectedTerm(null)}
                fullWidth
              >
                بازگشت به انتخاب ترم
              </Button>
            </Box>
            {studentInfo.terms
              .filter((t) => t.term_number === selectedTerm)
              .map((term) => (
                <ChartTable
                  key={term.term_number}
                  semester={term.term_number}
                  courses={mapCourses(term.courses)}
                  totalUnits={term.total_units}
                  totalPassedUnits={term.total_passed ?? 0}
                  totalGrade={term.grade ?? "-"}
                />
              ))}
          </>
        )}
      </GlassContainer>
    );
  }

  // ─── DESKTOP VIEW ─────────────────────────────────────────────────────────
  return (
    <GlassContainer className="rounded-xl p-10">
      <Box textAlign="center" mb={6}>
        <Typography variant="h4" fontWeight="bold">
          نمودار دروس دوره
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {studentInfo.terms.map((term: Term) => (
          <Grid item xs={12} md={6} key={term.term_number}>
            <ChartTable
              semester={term.term_number}
              courses={mapCourses(term.courses)}
              totalUnits={term.total_units}
              totalPassedUnits={term.total_passed ?? 0}
              totalGrade={term.grade ?? "-"}
            />
          </Grid>
        ))}
      </Grid>
    </GlassContainer>
  );
}
