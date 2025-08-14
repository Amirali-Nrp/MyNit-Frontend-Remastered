import React from "react";
import Link from "next/link";

import { Box } from "@mui/material";

export default function Logo() {
  return (
    <>
      <Box
        component={Link}
        href="/"
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 1,
          textDecoration: "none",
          color: "inherit",
        }}
      >
        <Box
          component="img"
          src="assets/black-logo.png"
          alt="NIT Logo"
          sx={{ height: 40, width: 40 }}
        />
      </Box>
      <Box component="img" src="assets/name.png" alt="Name Logo" />
    </>
  );
}
