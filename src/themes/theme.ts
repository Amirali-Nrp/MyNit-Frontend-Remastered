"use client";

import { createContext, useMemo, useState } from "react";

import { createTheme } from "@mui/material/styles";

// export function ToggleColorMode() {
//   const [mode, setMode] = useState<"light" | "dark">("light");
//   const colorMode = useMemo(
//     () => ({
//       toggleColorMode: () => {
//         setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
//       },
//     }),
//     []
//   );
//   return { mode, colorMode };
// }

// const { mode } = ToggleColorMode();

// export const theme = useMemo(() => {
//   createTheme({
//     palette: {
//       mode,
//       primary: {
//         main: "#0099ff",
//         light: "#33bfff",
//         dark: "#0066cc",
//       },
//       // background: {
//       //   default: "#fff",
//       // },
//     },
//     typography: {
//       fontFamily: "Vazirmatn",
//     },
//     direction: "rtl",
//   });
// }, [mode]);

export const ColorModeContext = createContext({ toggleColorMode: () => {} });
