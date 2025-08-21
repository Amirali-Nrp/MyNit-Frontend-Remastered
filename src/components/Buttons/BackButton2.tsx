// components/BackButton.tsx
import React from "react";
import { useRouter } from "next/navigation"; // for Pages Router

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Button } from "@mui/material";

type BackButtonProps = {
  fallback?: string; // where to go if there's no history
};

const BackButton2: React.FC<BackButtonProps> = ({ fallback = "/" }) => {
  const router = useRouter();

  const handleClick = () => {
    // if there’s history, go back; otherwise send them to fallback
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(fallback);
    }
  };

  return (
    <Box mb={2}>
      <Button
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        onClick={handleClick}
        fullWidth
      >
        بازگشت
      </Button>
    </Box>
  );
};

export default BackButton2;
