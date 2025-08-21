import * as React from "react";

import { Box, Button, Stack, Tooltip } from "@mui/material";

type Props = {
  onParse: () => void;
  onClear: () => void;
  onSubmit: () => void;
  submitting: boolean;
  disabledSubmit: boolean;
  tooltip?: string;
};

export default function ActionsBar({
  onParse,
  onClear,
  onSubmit,
  submitting,
  disabledSubmit,
  tooltip,
}: Props) {
  return (
    <Stack direction="row" spacing={1}>
      <Button variant="contained" onClick={onParse}>
        تجزیه
      </Button>
      <Button variant="outlined" onClick={onClear}>
        پاک کردن
      </Button>
      <Box flexGrow={1} />
      <Tooltip title={tooltip || ""}>
        <span>
          <Button
            variant="contained"
            color="success"
            disabled={submitting || disabledSubmit}
            onClick={onSubmit}
          >
            {submitting ? "در حال ارسال…" : "ارسال"}
          </Button>
        </span>
      </Tooltip>
    </Stack>
  );
}
