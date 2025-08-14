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

export default function UserArea({
  name,
  isLoading,
  onLogout,
  color = "#0f172a",
}: Props) {
  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
      {isLoading ? (
        <Stack direction="row" alignItems="center" sx={{ pl: 1 }}>
          <CircularProgress
            sx={{ color: "#0f172a" }}
            size={20}
            thickness={5}
            aria-label="Loading user"
          />
        </Stack>
      ) : (
        <>
          <Typography
            sx={{ display: { xs: "none", md: "flex" } }}
            variant="body2"
            fontWeight={700}
            color={color}
          >
            {name ?? "Unknown User"}
          </Typography>
          {name && name !== "Unknown User" && (
            <IconButton
              onClick={onLogout}
              sx={{
                borderRadius: "50%",
                border: "1px solid",
                borderColor: color,
                p: 1,
                color,
              }}
              aria-label="Logout"
            >
              <LogoutRoundedIcon fontSize="medium" />
            </IconButton>
          )}
        </>
      )}
    </Stack>
  );
}
