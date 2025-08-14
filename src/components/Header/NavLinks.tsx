"use client";

import * as React from "react";
import Link from "next/link";

import { Button } from "@mui/material";

export type NavItem = { label: string; href: string; external?: boolean };

type Props = {
  items: NavItem[];
  pathname: string;
  color?: string; // brand color
};

export default function NavLinks({
  items,
  pathname,
  color = "#0f172a",
}: Props) {
  return (
    <>
      {items.map((item) => {
        const active = pathname === item.href;
        const Component = (item.external ? "a" : Link) as any;
        const commonProps = item.external
          ? { href: item.href, target: "_blank", rel: "noopener noreferrer" }
          : { href: item.href };

        return (
          <Button
            key={item.href}
            component={Component}
            {...commonProps}
            variant={active ? "outlined" : "text"}
            size="small"
            sx={{
              borderRadius: 999,
              fontWeight: 600,
              textTransform: "none",
              color,
              borderColor: active ? color : "transparent",
              "&:hover": { borderColor: color },
              display: { xs: "none", sm: "inline-flex" },
            }}
          >
            {item.label}
          </Button>
        );
      })}
    </>
  );
}
