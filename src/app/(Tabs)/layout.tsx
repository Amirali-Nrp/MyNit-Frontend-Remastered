import React from "react";

import { Box } from "@mui/material";

import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box overflow="hidden">
      <Header />
      <Sidebar />
      <Box
        component="main"
        className="layout flex-1 bg-primary pb-16 text-white lg:mx-32"
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
