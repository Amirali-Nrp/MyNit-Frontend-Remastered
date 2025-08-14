"use client";

import * as React from "react";

import { Slide, useScrollTrigger } from "@mui/material";

export default function HideOnScroll({
  children,
}: {
  children: React.ReactElement;
}) {
  const trigger = useScrollTrigger({ threshold: 0 });
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}
