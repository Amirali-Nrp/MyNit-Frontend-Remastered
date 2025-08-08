"use client";

import * as React from "react";

import useGetUnits from "@/core/services/api/use-getunits";
import { useSidebarStorage } from "@/storage/storage";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, Tooltip } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import UniversityLogo from "../icons/UniversityLogo";

export default function Header() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const { toggleCollapse, setToggleCollapse } = useSidebarStorage();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };

  const { data: studentInfo } = useGetUnits();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "background.default",
          borderTop: "4px solid #002145",
          paddingY: 1,
        }}
      >
        <Toolbar>
          <Box className="lg:hidden">
            <IconButton
              size="large"
              edge="start"
              // color="success"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleSidebarToggle}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Box className="flex flex-grow flex-row items-center gap-2">
            <UniversityLogo />
            <Typography variant="h6">دانشگاه نوشیروانی بابل</Typography>
          </Box>
          {
            <div>
              <Tooltip title="تنظیمات کاربر">
                <IconButton onClick={handleMenu} sx={{ p: 0, gap: 2 }}>
                  <Typography
                    className="hidden sm:flex"
                    sx={{ fontFamily: "Vazirmatn" }}
                  >
                    {studentInfo?.name}
                  </Typography>
                  <Avatar alt="" src="" />
                </IconButton>
              </Tooltip>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}
