"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { logOutAction } from "@/core/actions";
import useGetUnits from "@/core/services/api/use-getunits";
import { useSidebarStorage } from "@/storage/storage";
import showToast from "@/utils/showToast";
import { AppBar, Box, IconButton, Stack, Toolbar } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { DateTimePill } from "./DateTimePill"; // your existing file
import HideOnScroll from "./HideOnScroll";
import Logo from "./Logo"; // your existing file
import NavLinks, { NavItem } from "./NavLinks";
import UserArea from "./UserArea";

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const theme = useTheme();

  const { toggleCollapse, setToggleCollapse } = useSidebarStorage();

  // Fetch student (via your hook)
  const { data: studentInfo, isLoading, isError } = useGetUnits();
  const name = isError ? "Unknown User" : (studentInfo?.name ?? null);

  const navItems: NavItem[] = [{ label: "داشبورد", href: "/dashboard" }];

  const handleSidebarToggle = () => setToggleCollapse(!toggleCollapse);

  const handleLogout = async () => {
    const res = await logOutAction();
    if (res) {
      showToast("با موفقیت خارج شدید.", "success", 3000);
      router.push("/login");
    } else {
      showToast("خطا در خروج از حساب کاربری.", "error", 3000);
    }
  };

  return (
    <>
      <HideOnScroll>
        <AppBar
          elevation={0}
          sx={(t) => ({
            top: 12,
            left: 0,
            right: 0,
            mx: "auto",
            width: { xs: "calc(100% - 1.5rem)", sm: "min(1080px, 92%)" },
            borderRadius: 999,
            backdropFilter: "blur(10px)",
            border: `1px solid ${t.palette.divider}`,
            backgroundColor:
              t.palette.mode === "light"
                ? "rgba(255,255,255,0.7)"
                : "rgba(17,25,40,0.6)",
          })}
        >
          <Toolbar sx={{ minHeight: 64, px: { xs: 1, sm: 2 }, gap: 1 }}>
            {/* Mobile sidebar toggle */}
            <IconButton
              onClick={handleSidebarToggle}
              sx={{ display: { xs: "inline-flex", md: "none" }, ml: 1 }}
              aria-label="Open menu"
            >
              <Box
                component="img"
                src="assets/menu.svg"
                alt="Menu Icon"
                sx={{ width: 38, height: 38 }}
              />
            </IconButton>

            <Logo />

            {/* Top-level nav (desktop) */}
            <NavLinks items={navItems} pathname={pathname} />

            <Box sx={{ flexGrow: 1 }} />

            {/* Date/Time pill */}
            <Box sx={{ display: { xs: "none", sm: "flex" } }}>
              <DateTimePill />
            </Box>

            {/* User area */}
            <UserArea
              name={name}
              isLoading={isLoading}
              onLogout={handleLogout}
            />
          </Toolbar>
        </AppBar>
      </HideOnScroll>

      {/* Offset so content doesn't hide under the floating bar */}
      <Toolbar sx={{ mb: { xs: 6, md: 8 } }} />
    </>
  );
}
