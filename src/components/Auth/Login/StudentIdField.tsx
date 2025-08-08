"use client";

import * as React from "react";

import { TloginObject } from "@/validation/zod";
import TextField from "@mui/material/TextField";
import { UseFormRegister } from "react-hook-form";

type Register = UseFormRegister<TloginObject>;

type Props = {
  register?: Register;
  error?: any;
  helperText?: React.ReactNode;
};

export default function StudentIdField({ register, error, helperText }: Props) {
  const reg = register ? register("id") : undefined;

  return (
    <TextField
      {...reg}
      margin="normal"
      fullWidth
      required
      id="id"
      label="شماره دانشجویی"
      name="id"
      autoComplete="id"
      autoFocus
      sx={{
        "& label.Mui-focused": { color: "white" },
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "white" },
          "&:hover fieldset": { borderColor: "white" },
          "&.Mui-focused fieldset": { borderColor: "white" },
        },
      }}
      InputProps={{
        sx: { borderRadius: 50, color: "white" },
        inputMode: "numeric",
      }}
      InputLabelProps={{ sx: { fontFamily: "vazirmatn", color: "white" } }}
      error={!!error}
      helperText={helperText}
    />
  );
}
