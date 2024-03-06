import React, { useContext } from "react";

import { Box } from "@mui/material";
import { Toaster } from "react-hot-toast";

function ToasterContainer() {
  return (
    // <Box sx={{ displayPrint: "none" }}>
    <Toaster
      containerStyle={{
        textAlign: "right",
      }}
      toastOptions={{
        style: {
          backgroundColor: "A3B8C9",
          color: "black",
        },
      }}
      position="bottom-left"
    />
    // </Box>
  );
}

export default ToasterContainer;
