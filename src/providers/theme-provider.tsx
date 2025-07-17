"use client";

import * as React from "react";

import { ColorModeContext } from "@/themes/theme";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { createTheme, CssBaseline, Theme, ThemeProvider } from "@mui/material";
import stylisRTLPlugin from "stylis-plugin-rtl";

const CustomThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [stylisRTLPlugin],
  });

  const [mode, setMode] = React.useState<"light" | "dark">("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: "#0099ff",
            light: "#33bfff",
            dark: "#0066cc",
          },
          background: {
            default: mode == "dark" ? "#000" : "#fff",
          },
        },
        typography: {
          fontFamily: "Vazirmatn",
          h6: {
            color: mode === "dark" ? "#fff" : "#000",
          },
        },
        direction: "rtl",
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <CacheProvider value={cacheRtl}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </CacheProvider>
    </ColorModeContext.Provider>
  );
};

export default CustomThemeProvider;
