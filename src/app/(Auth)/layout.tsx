"use client";

import React from "react";

import { Box, Container, Typography } from "@mui/material";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 10 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img src="/assets/logo.png" />
        <Typography
          component="h1"
          variant="h5"
          sx={{
            margin: "20px",
            fontSize: "21px",
            fontWeight: "550",
          }}
        >
          سامانه دانشجویی دانشگاه نوشیروانی بابل
        </Typography>
        {children}
      </Box>
    </Container>
  );
}
