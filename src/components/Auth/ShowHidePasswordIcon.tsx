"use client";

import * as React from "react";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

type Props = {
  show: boolean;
  onToggle: (next: boolean) => void;
  sx?: any;
  ariaLabelShow?: string;
  ariaLabelHide?: string;
};

export default function ShowHidePasswordIcon({
  show,
  onToggle,
  sx,
  ariaLabelShow = "نمایش رمز",
  ariaLabelHide = "مخفی کردن رمز",
}: Props) {
  const handleMouseDown = (e: React.MouseEvent) => e.preventDefault(); // keep focus in input

  return (
    <InputAdornment position="end">
      <IconButton
        onClick={() => onToggle(!show)}
        onMouseDown={handleMouseDown}
        edge="end"
        sx={sx}
        aria-label={show ? ariaLabelHide : ariaLabelShow}
      >
        {show ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  );
}
