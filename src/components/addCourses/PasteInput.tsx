import * as React from "react";

import { TextField } from "@mui/material";

type Props = {
  value: string;
  onChange: (v: string) => void;
};

export default function PasteInput({ value, onChange }: Props) {
  return (
    <TextField
      label="کد HTML بخش <tbody>"
      placeholder={`<tbody>\n  <tr><td>مقدار۱</td><td>مقدار۲</td></tr>\n</tbody>`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      multiline
      minRows={8}
      maxRows={20}
      fullWidth
      inputProps={{ dir: "ltr", spellCheck: "false" }}
      sx={{
        "& .MuiInputBase-inputMultiline": {
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          overflowWrap: "anywhere",
          direction: "ltr",
          fontFamily:
            'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono","Courier New", monospace',
        },
      }}
    />
  );
}
