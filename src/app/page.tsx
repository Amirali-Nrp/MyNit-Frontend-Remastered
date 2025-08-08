"use client";

import { useRouter } from "next/navigation";

import { Box, Container, Typography } from "@mui/material";

import "@/app/button.css";

export default function Home() {
  const router = useRouter();

  return (
    <div className="absolute h-full w-full bg-[url('/assets/nit-map.png')] bg-cover text-white">
      <Container component="main" maxWidth="xs" sx={{ mt: 10 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src="/assets/logo.png" />
          <Typography
            component="h1"
            variant="h5"
            sx={{
              margin: "20px",
              fontSize: "21px",
              fontWeight: "550",
            }}
          >
            سامانه هوشمند انتخاب واحد
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              gap: 2,
            }}
          >
            <button className="button-48" onClick={() => router.push("/login")}>
              <span>ورود</span>
            </button>
            <button
              className="button-48"
              onClick={() => router.push("/register")}
            >
              <span>ثبت نام</span>
            </button>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
