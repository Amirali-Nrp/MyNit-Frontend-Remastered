"use client";

import React from "react";

import { Box, Container, Typography } from "@mui/material";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 5 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img src="/assets/logo.png" />
        <Typography
          variant="h6"
          className="text-center"
          sx={{
            margin: "12px",
            fontWeight: "600",
          }}
        >
          سامانه دانشجویی دانشگاه نوشیروانی بابل
        </Typography>
        {children}
      </Box>
    </Container>
  );
}
