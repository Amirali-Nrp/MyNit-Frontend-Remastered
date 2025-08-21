"use client";

import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#002670",
      light: "#668CC4", // A lighter shade of the main color
      dark: "#0D1D3E", // A darker shade of the main color
    },
  },
  typography: {
    fontFamily: "Vazirmatn",
    h3: {
      fontSize: "1.2rem",
      "@media (min-width:640px)": {
        fontSize: "1.25rem",
      },
      fontWeight: 550,
    },
    h6: {
      fontSize: "1rem",
      "@media (min-width:1024px)": {
        fontSize: "1.25rem",
      },
      fontWeight: 550,
    },
  },
  direction: "rtl",
});
