// /components/terms/TermsMobile.tsx
"use client";

import { useState } from "react";

import { Term } from "@/types";
import { mapCoursesToRows } from "@/utils/mapCourses";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SchoolIcon from "@mui/icons-material/School";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

import ChartTable from "@/components/Chart/ChartTable";
import GlassContainer from "@/components/Glass/GlassContainer";

interface TermsMobileProps {
  terms: Term[];
  title?: string;
  isRemaining?: boolean;
}

export default function TermsMobile({
  terms,
  title = "جدول ها",
  isRemaining = false,
}: TermsMobileProps) {
  const [selectedTerm, setSelectedTerm] = useState<number | null>(null);

  return (
    <GlassContainer className="rounded-lg p-8">
      <Box textAlign="center" mb={4}>
        <Typography variant="h5" fontWeight="bold">
          {title}
        </Typography>
      </Box>

      {selectedTerm == null ? (
        <List component="nav">
          {terms.map((term) => (
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

          {terms
            .filter((t) => t.term_number === selectedTerm)
            .map((term) => (
              <ChartTable
                key={term.term_number}
                semester={term.term_number}
                courses={mapCoursesToRows(term.courses)}
                totalUnits={term.total_units}
                totalPassedUnits={term.total_passed ?? 0}
                totalGrade={term.grade ?? "-"}
                isRemaining={isRemaining}
              />
            ))}
        </>
      )}
    </GlassContainer>
  );
}
