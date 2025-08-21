"use client";

import { Box, Container, Divider, Stack, Typography } from "@mui/material";

import ManageByIdPanel from "@/components/admin/ManageByIdPanel";
import StudentList from "@/components/admin/StudentList";

export default function page() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }} dir="rtl">
      <Stack spacing={3}>
        <Box>
          <Typography
            variant="h4"
            fontWeight={700}
            sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem", md: "2rem" } }} // ← تیتر کوچکتر در موبایل
          >
            مدیریت — دانشجویان
          </Typography>
          <Typography variant="body2" color="text.secondary">
            جستجو، مرتب‌سازی و مدیریت رکوردهای دانشجویان.
          </Typography>
        </Box>

        <ManageByIdPanel />

        <Divider />

        <StudentList />
      </Stack>
    </Container>
  );
}
