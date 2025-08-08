// /components/terms/TermsDesktop.tsx
"use client";

import { Term } from "@/types";
import { mapCoursesToRows } from "@/utils/mapCourses";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import ChartTable from "@/components/Chart/ChartTable";
import GlassContainer from "@/components/Glass/GlassContainer";

interface TermsDesktopProps {
  terms: Term[];
  title?: string;
  isRemaining?: boolean;
}

export default function TermsDesktop({
  terms,
  title = "جدول ها",
  isRemaining = false,
}: TermsDesktopProps) {
  return (
    <GlassContainer className="rounded-xl p-10">
      <Box textAlign="center" mb={6}>
        <Typography variant="h4" fontWeight="bold">
          {title}
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {terms.map((term) => (
          <Grid item xs={12} md={6} key={term.term_number}>
            <ChartTable
              semester={term.term_number}
              courses={mapCoursesToRows(term.courses)}
              totalUnits={term.total_units}
              totalPassedUnits={term.total_passed ?? 0}
              totalGrade={term.grade ?? "-"}
              isRemaining={isRemaining}
            />
          </Grid>
        ))}
      </Grid>
    </GlassContainer>
  );
}
