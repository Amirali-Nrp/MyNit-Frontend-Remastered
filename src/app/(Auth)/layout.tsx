"use client";

import React from "react";

import { Box, Container, CssBaseline, Typography } from "@mui/material";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute flex h-full w-full items-center justify-center bg-[url('/assets/nit-map.png')] bg-cover text-white">
      <Container
        component="main"
        maxWidth="sm"
        sx={{ mt: 5 }}
        className="mx-12 rounded-xl bg-white bg-opacity-0 p-12 sm:bg-opacity-10 sm:backdrop-blur-sm"
      >
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
            variant="h6"
            className="text-center"
            sx={{
              margin: "20px",
              fontWeight: "550",
              color: "white",
            }}
          >
            سامانه هوشمند انتخاب واحد
          </Typography>
          {children}
        </Box>
      </Container>
    </div>
  );
}
