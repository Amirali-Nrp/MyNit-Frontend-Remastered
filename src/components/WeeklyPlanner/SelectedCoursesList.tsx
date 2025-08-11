import { Eligible } from "@/types";
import showToast from "@/utils/showToast";
import { Box, Chip, Typography } from "@mui/material";
import { Copy } from "lucide-react";

interface SelectedCoursesListProps {
  selected: Record<string, Eligible>;
}

export default function SelectedCoursesList({
  selected,
}: SelectedCoursesListProps) {
  return (
    <Box mt={3}>
      <Typography color="#0f172a" fontWeight={700} mb={1}>
        دروس انتخاب‌شده
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={1}>
        {Object.values(selected).map((c) => (
          <Chip
            key={`course-${c.courseID}`}
            label={`${c.courseName} — ${c.courseID}`}
            onClick={() => {
              navigator.clipboard.writeText(c.courseID);
              showToast("کد درس کپی شد", "success", 2000);
            }}
            deleteIcon={<Copy size={16} />}
            onDelete={() => {
              navigator.clipboard.writeText(c.courseID);
              showToast("کد درس کپی شد", "success", 2000);
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
