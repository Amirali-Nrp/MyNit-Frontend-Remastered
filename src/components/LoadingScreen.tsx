// /components/LoadingScreen.tsx
"use client";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export default function LoadingScreen() {
  return (
    <Box className="flex h-screen items-center justify-center">
      <CircularProgress />
    </Box>
  );
}
