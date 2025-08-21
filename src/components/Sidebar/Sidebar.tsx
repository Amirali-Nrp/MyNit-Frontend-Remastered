"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { adminMenuItems, menuItems } from "@/constants/menu.items";
import { useSidebarStorage } from "@/storage/storage";
import { MenuItem } from "@/types";
import { Box } from "@mui/material";
import { useSession } from "next-auth/react";

import { cn } from "@/lib/utils";

import GlassContainer from "../Glass/GlassContainer";

const Sidebar = () => {
  const { data: session } = useSession();

  const { toggleCollapse, setToggleCollapse } = useSidebarStorage();

  const pathname = usePathname();

  const activeMenu: MenuItem | undefined = useMemo(
    () => menuItems.find((menu) => menu.href === pathname),
    [pathname]
  );

  const wrapperClasses = cn(
    `z-10 max-lg:h-screen h-fit px-4 pt-8 pb-4 max-lg:p-0 flex flex-col justify-center relative top-1/2 transform -translate-y-1/2 fixed`,
    {
      ["w-80 max-lg:w-full"]: !toggleCollapse,
      ["w-20 max-lg:w-0"]: toggleCollapse,
    }
  );

  const getNavItemClasses = (menu: {
    id: number;
    name: string;
    href: string;
  }) => {
    return cn(
      "flex items-center cursor-pointer hover:bg-[#e1f0fc] w-full overflow-hidden whitespace-nowrap",
      {
        ["bg-[#71b0e3]"]: activeMenu?.id === menu.id,
      }
    );
  };

  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };

  return (
    <Box
      className={wrapperClasses}
      onMouseEnter={handleSidebarToggle}
      onMouseLeave={handleSidebarToggle}
      sx={{
        transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s",
      }}
    >
      <GlassContainer className="rounded-md backdrop-blur-lg max-lg:flex max-lg:h-screen max-lg:items-center">
        <Box className="flex flex-col items-center gap-1 max-lg:w-full max-lg:px-4">
          {menuItems.map(({ icon: Icon, ...menu }) => {
            const classes = getNavItemClasses(menu);
            return (
              <Box className={classes} key={menu.id}>
                <Link
                  href={menu.href}
                  className="flex h-full w-full items-center px-3 py-4"
                >
                  <Box sx={{ width: "2.5rem" }}>
                    <Icon size={20} />
                  </Box>
                  {!toggleCollapse && (
                    <span className={cn("text-md text-text-light font-medium")}>
                      {menu.name}
                    </span>
                  )}
                </Link>
              </Box>
            );
          })}
          {session?.user.isAdmin &&
            adminMenuItems.map(({ icon: Icon, ...menu }) => {
              const classes = getNavItemClasses(menu);
              return (
                <Box className={classes} key={menu.id}>
                  <Link
                    href={menu.href}
                    className="flex h-full w-full items-center px-3 py-4"
                  >
                    <Box sx={{ width: "2.5rem" }}>
                      <Icon size={20} />
                    </Box>
                    {!toggleCollapse && (
                      <span className="text-md text-text-light font-medium">
                        {menu.name}
                      </span>
                    )}
                  </Link>
                </Box>
              );
            })}
        </Box>
      </GlassContainer>
    </Box>
  );
};

export default Sidebar;
