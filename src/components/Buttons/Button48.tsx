"use client";

import React from "react";

import CircularProgress from "@mui/material/CircularProgress";

type Button48Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean; // show spinner + disable
  spinnerSize?: number; // optional: tweak spinner size
  label?: React.ReactNode; // fallback if you don't pass children
};

export default function Button48({
  loading = false,
  disabled,
  type = "button",
  className,
  children,
  spinnerSize = 20,
  label,
  ...rest
}: Button48Props) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading}
      aria-live="polite"
      className={["button-48", className].filter(Boolean).join(" ")}
      {...rest}
    >
      {loading ? (
        <div className="flex w-full items-center justify-center">
          <CircularProgress size={spinnerSize} />
        </div>
      ) : (
        <span>{children ?? label}</span>
      )}
    </button>
  );
}
