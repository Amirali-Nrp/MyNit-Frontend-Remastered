import React, { useContext } from "react";

import { Box } from "@mui/material";
import { Toaster } from "react-hot-toast";

function ToasterContainer() {
  return (
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
      position="top-center"
    />
  );
}

export default ToasterContainer;
