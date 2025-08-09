// components/BackButton.tsx
import React from "react";
import { useRouter } from "next/navigation"; // for Pages Router

import { Button } from "@mui/material";

import Button48 from "./Button48";

// import { useRouter } from 'next/navigation' // for App Router

type BackButtonProps = {
  fallback?: string; // where to go if there's no history
};

const BackButton: React.FC<BackButtonProps> = ({ fallback = "/" }) => {
  const router = useRouter();

  const handleClick = () => {
    // if there’s history, go back; otherwise send them to fallback
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(fallback);
    }
  };

  return <Button48 label="بازگشت" onClick={handleClick} />;
};

export default BackButton;
