"use client";

import React from "react";

import { Box, Typography } from "@mui/material";

import GlassContainer from "@/components/Glass/GlassContainer";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute flex min-h-screen w-full items-center justify-center bg-[url('/assets/nit-map.png')] bg-cover text-white">
      <GlassContainer
        className=" w-full p-6 sm:w-fit sm:max-w-xl sm:rounded-3xl sm:p-12"
        variant="dark"
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
      </GlassContainer>
    </div>
  );
}
