"use client";

import * as React from "react";
import { useState } from "react";

import TextField from "@mui/material/TextField";
import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

import ShowHidePasswordIcon from "@/components/Auth/ShowHidePasswordIcon";

type Props<T extends FieldValues> = {
  register?: UseFormRegister<T>;
  /** the field name from your form schema, e.g. "password" | "confirmPassword" */
  name: Path<T>;
  label?: string; // default: "رمزعبور"
  error?: FieldError;
  helperText?: React.ReactNode;
  InputLabelProps?: any;
  sx?: any;
  autoComplete?: string; // e.g. "current-password" | "new-password"
  required?: boolean; // default: true
};

export default function PasswordField<T extends FieldValues>({
  register,
  name,
  label = "رمزعبور",
  error,
  helperText,
  InputLabelProps,
  sx,
  autoComplete = "current-password",
  required = true,
  ...rest
}: Props<T>) {
  const [show, setShow] = useState(false);
  const reg = register ? register(name) : undefined;

  return (
    <TextField
      {...reg} // keep RHF’s ref/onChange/onBlur/name intact
      name={name as string}
      label={label}
      type={show ? "text" : "password"}
      id={String(name)}
      autoComplete={autoComplete}
      margin="normal"
      fullWidth
      required={required}
      sx={{
        "& label.Mui-focused": { color: "white" },
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "white" },
          "&:hover fieldset": { borderColor: "white" },
          "&.Mui-focused fieldset": { borderColor: "white" },
        },
        ...sx,
      }}
      InputProps={{
        sx: { borderRadius: 50, color: "white" },
        endAdornment: (
          <ShowHidePasswordIcon
            show={show}
            onToggle={setShow}
            sx={{ color: "white" }}
          />
        ),
      }}
      InputLabelProps={{
        ...(InputLabelProps || {}),
        sx: {
          fontFamily: "vazirmatn",
          color: "white",
          ...(InputLabelProps?.sx || {}),
        },
      }}
      error={!!error}
      helperText={helperText}
      {...rest}
    />
  );
}
