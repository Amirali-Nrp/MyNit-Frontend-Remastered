"use client";

import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#0099ff",
      light: "#33bfff",
      dark: "#0066cc",
    },
  },
  typography: {
    fontFamily: "Vazirmatn",
  },
  direction: "rtl",
});
