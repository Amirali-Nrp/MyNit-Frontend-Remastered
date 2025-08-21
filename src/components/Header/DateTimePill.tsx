import React from "react";

import { Divider, Stack, Typography } from "@mui/material";

export function DateTimePill() {
  const [now, setNow] = React.useState<Date | null>(null);

  React.useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!now) return null;

  // Time (Tehran) with Persian digits
  const time = new Intl.DateTimeFormat("fa-IR-u-nu-arab", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Asia/Tehran",
  }).format(now);

  // Jalali month + day (e.g., "۱۴ اردیبهشت") with Persian digits
  const dayMonth = new Intl.DateTimeFormat("fa-IR-u-ca-persian-nu-arab", {
    day: "2-digit",
    month: "long",
    timeZone: "Asia/Tehran",
  }).format(now);

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      // Force RTL inside the pill so content order is right→left
      dir="rtl"
      sx={(t) => ({
        px: 1.5,
        py: 0.5,
        borderRadius: 999,
        border: `1px solid ${t.palette.divider}`,
        backdropFilter: "blur(6px)",
        backgroundColor:
          t.palette.mode === "light"
            ? "rgba(255,255,255,0.7)"
            : "rgba(17,25,40,0.5)",
        boxShadow:
          t.palette.mode === "light"
            ? "0 6px 20px rgba(0,0,0,0.06)"
            : "0 6px 20px rgba(0,0,0,0.5)",
        color: "#0f172a",
        textAlign: "right",
        width: "150px",
        justifyContent: "space-between",
      })}
    >
      {/* Put date first so it appears on the RIGHT in RTL */}
      <Typography variant="body2" sx={{ opacity: 0.8 }}>
        {dayMonth}
      </Typography>
      <Divider
        orientation="vertical"
        flexItem
        sx={{ mx: 0.5, opacity: 0.35 }}
      />
      <Typography variant="body2" fontWeight={700}>
        {time}
      </Typography>
    </Stack>
  );
}
