"use client";

import * as React from "react";

import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { CircularProgress, IconButton, Stack, Typography } from "@mui/material";

type Props = {
  name: string | null;
  isLoading: boolean;
  onLogout: () => void | Promise<void>;
  color?: string; // brand color
};

export default function UserArea({ name, isLoading, onLogout }: Props) {
  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
      {isLoading ? (
        <Stack direction="row" alignItems="center" sx={{ pl: 1 }}>
          <CircularProgress size={20} thickness={5} aria-label="Loading user" />
        </Stack>
      ) : (
        <>
          <Typography
            sx={{ display: { xs: "none", md: "flex" } }}
            variant="body2"
            fontWeight={700}
            color="primary" // Use theme color or custom color
          >
            {name ?? "Unknown User"}
          </Typography>
          {name && name !== "Unknown User" && (
            <IconButton
              onClick={onLogout}
              sx={{
                borderRadius: "50%",
                border: "1px solid",
                p: 1,
              }}
              aria-label="Logout"
              color="primary" // Use theme color or custom color
            >
              <LogoutRoundedIcon fontSize="medium" />
            </IconButton>
          )}
        </>
      )}
    </Stack>
  );
}
