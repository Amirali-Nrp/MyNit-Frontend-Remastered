import React from "react";

import { Box } from "@mui/material";

import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <Box className="flex h-screen flex-row justify-start">
        <Sidebar />
        <Box className=" mx-8 mt-32 flex-1 bg-primary text-white lg:m-32">
          {children}
        </Box>
      </Box>
    </>
  );
};

export default Layout;
