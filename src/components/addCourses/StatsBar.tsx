import * as React from "react";

import { Chip, Stack, Typography } from "@mui/material";

export default function StatsBar({
  rowCount,
  colCount,
}: {
  rowCount: number;
  colCount: number;
}) {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Typography variant="subtitle2" color="primary.dark" fontWeight={700}>
        پیش‌نمایش:
      </Typography>
      <Chip label={`${rowCount} ردیف`} />
      <Chip label={`${colCount} ستون`} />
    </Stack>
  );
}
