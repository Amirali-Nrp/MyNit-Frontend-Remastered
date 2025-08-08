// /components/ErrorState.tsx
"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default function ErrorState({
  message = "خطا در دریافت اطلاعات دانشجو!",
}: {
  message?: string;
}) {
  return (
    <Container>
      <Box className="py-16 text-center">
        <Typography color="error" variant="h6">
          {message}
        </Typography>
      </Box>
    </Container>
  );
}
