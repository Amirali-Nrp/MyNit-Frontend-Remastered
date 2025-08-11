import { Eligible } from "@/types";
import { Box, Chip, Typography } from "@mui/material";
import { Trash2 } from "lucide-react";

interface SelectedExamsListProps {
  selected: Record<string, Eligible>;
  removeCourse: (courseID: string) => void;
}

export default function SelectedExamsList({
  selected,
  removeCourse,
}: SelectedExamsListProps) {
  return (
    <Box mt={3}>
      <Typography color="#0f172a" fontWeight={700} mb={1}>
        امتحانات انتخاب‌شده
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={1}>
        {Object.values(selected).map((c) => (
          <Chip
            key={`exam-${c.courseID}`}
            label={`${c.courseName} — ${c.dateAndTime.exam?.date ?? "بدون تاریخ"} / ${c.dateAndTime.exam?.time ?? "—"}`}
            onDelete={() => removeCourse(c.courseID)}
            deleteIcon={<Trash2 size={16} />}
          />
        ))}
      </Box>
    </Box>
  );
}
