"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Container,
  Divider,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";

export default function NotFound() {
  const theme = useTheme();
  const router = useRouter();
  const [query, setQuery] = React.useState("");

  const isDark = theme.palette.mode === "dark";

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    // مسیر صفحه جستجوی خود را تنظیم کنید
    router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  const Accent = ({ children }: React.PropsWithChildren) => (
    <Box
      component="span"
      sx={{
        background: "linear-gradient(135deg, #7C3AED, #06B6D4)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      {children}
    </Box>
  );

  return (
    <Box
      // اعمال راست‌به‌چپ در سطح صفحه
      dir="rtl"
      sx={{
        minHeight: "100dvh",
        display: "grid",
        placeItems: "center",
        position: "relative",
        overflow: "hidden",
        background: isDark
          ? "radial-gradient(1000px 600px at 20% -10%, rgba(124,58,237,0.25), transparent 60%), radial-gradient(800px 500px at 80% 120%, rgba(6,182,212,0.25), transparent 60%), linear-gradient(180deg, #0B1020, #0A0D16)"
          : "radial-gradient(1000px 600px at 20% -10%, rgba(124,58,237,0.18), transparent 60%), radial-gradient(800px 500px at 80% 120%, rgba(6,182,212,0.18), transparent 60%), linear-gradient(180deg, #F9FAFB, #EFF6FF)",
      }}
    >
      {/* هاله‌های نوری لطیف */}
      {[...Array(6)].map((_, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: 0.35,
            scale: 1,
            y: [0, -10, 0],
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
          style={{
            position: "absolute",
            width: 220 + i * 40,
            height: 220 + i * 40,
            borderRadius: "50%",
            filter: "blur(40px)",
            background:
              i % 2 === 0 ? "rgba(124,58,237,0.25)" : "rgba(6,182,212,0.25)",
            top: i % 2 ? `${10 + i * 8}%` : "auto",
            bottom: i % 2 ? "auto" : `${5 + i * 6}%`,
            left: i % 3 ? `${5 + i * 7}%` : "auto",
            right: i % 3 ? "auto" : `${2 + i * 6}%`,
            pointerEvents: "none",
          }}
        />
      ))}

      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
        <Stack spacing={4} alignItems="center" textAlign="center">
          {/* برچسب 404 */}
          <Chip
            icon={<AutoAwesomeRoundedIcon />}
            label="اوه! صفحه پیدا نشد"
            variant="outlined"
            sx={{
              borderColor: isDark ? "#7C3AED" : "#6D28D9",
              color: isDark ? "#C4B5FD" : "#6D28D9",
              px: 1,
              py: 0.5,
              fontWeight: 600,
              backdropFilter: "blur(8px)",
              backgroundColor: isDark
                ? "rgba(124,58,237,0.08)"
                : "rgba(124,58,237,0.06)",
            }}
          />

          {/* 404 بزرگ */}
          <Box sx={{ position: "relative" }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: 88, sm: 120, md: 150 },
                fontWeight: 900,
                letterSpacing: "-0.04em",
                lineHeight: 1,
                background: "linear-gradient(135deg, #7C3AED, #06B6D4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow: isDark
                  ? "0 6px 40px rgba(124,58,237,0.35), 0 2px 14px rgba(6,182,212,0.25)"
                  : "0 6px 40px rgba(124,58,237,0.25), 0 2px 14px rgba(6,182,212,0.18)",
              }}
            >
              ۴۰۴
            </Typography>
            {/* اکلیل‌ها */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2 }}
              style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
            >
              <svg width="100%" height="100%" viewBox="0 0 600 220">
                <defs>
                  <radialGradient id="glow" r="60%">
                    <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
                  </radialGradient>
                </defs>
                {[...Array(24)].map((_, i) => (
                  <circle
                    key={i}
                    cx={Math.random() * 600}
                    cy={Math.random() * 220}
                    r={1 + Math.random() * 2}
                    fill="#a5b4fc"
                  />
                ))}
                <circle cx="520" cy="40" r="32" fill="url(#glow)" />
              </svg>
            </motion.div>
          </Box>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              letterSpacing: "-0.02em",
              lineHeight: 1.25,
            }}
          >
            این صفحه <Accent>مسیر را اشتباه رفت</Accent>.
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              maxWidth: 680,
            }}
          >
            ممکن است آدرس را اشتباه تایپ کرده باشید، صفحه جابه‌جا شده باشد یا
            اصلاً وجود نداشته باشد.
          </Typography>

          {/* دکمه‌ها */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Button
              component={Link}
              href="/"
              size="large"
              startIcon={<HomeRoundedIcon />}
              variant="contained"
              sx={{
                px: 3,
                py: 1.25,
                borderRadius: 3,
                textTransform: "none",
                fontWeight: 700,
                background: "linear-gradient(135deg, #7C3AED, #06B6D4)",
                boxShadow:
                  "0 12px 24px rgba(124,58,237,0.3), 0 6px 12px rgba(6,182,212,0.2)",
                ":hover": {
                  transform: "translateY(-1px)",
                  boxShadow:
                    "0 16px 30px rgba(124,58,237,0.35), 0 8px 18px rgba(6,182,212,0.25)",
                },
              }}
            >
              بازگشت به خانه
            </Button>
            <Button
              size="large"
              onClick={() => router.back()}
              startIcon={<ArrowBackRoundedIcon />}
              sx={{
                px: 3,
                py: 1.25,
                borderRadius: 3,
                textTransform: "none",
                fontWeight: 700,
              }}
            >
              بازگشت
            </Button>
            <Button
              component={Link}
              href="/contact"
              size="large"
              startIcon={<SupportAgentRoundedIcon />}
              variant="outlined"
              sx={{
                px: 3,
                py: 1.25,
                borderRadius: 3,
                textTransform: "none",
                fontWeight: 700,
              }}
            >
              تماس با پشتیبانی
            </Button>
          </Stack>

          <Divider flexItem sx={{ opacity: 0.5 }} />

          {/* لینک‌های سریع */}
          {/* <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ width: "100%" }}
          >
            {[
              {
                title: "مستندات",
                href: "/docs",
                desc: "راهنماها و API را بخوانید.",
              },
              { title: "وبلاگ", href: "/blog", desc: "خبرها، تغییرات و نکات." },
              {
                title: "درباره ما",
                href: "/about",
                desc: "درباره پروژه بیشتر بدانید.",
              },
            ].map((item) => (
              <Card
                key={item.title}
                elevation={0}
                sx={{
                  flex: 1,
                  borderRadius: 3,
                  overflow: "hidden",
                  border: "1px solid",
                  borderColor: "divider",
                  background: isDark
                    ? "rgba(255,255,255,0.04)"
                    : "rgba(255,255,255,0.7)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <CardActionArea component={Link} href={item.href}>
                  <CardContent>
                    <Typography variant="h6" fontWeight={800} gutterBottom>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.desc}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Stack> */}

          {/* راهنما */}
          <Typography variant="caption" color="text.secondary">
            نکته: می‌توانید با <Accent>Ctrl/⌘ + K</Accent> جستجوی سریع را باز
            کنید.
          </Typography>
        </Stack>
      </Container>

      {/* شبکه محو ظریف */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: isDark ? 0.06 : 0.08,
          backgroundImage:
            "linear-gradient(rgba(127,127,127,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(127,127,127,0.25) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
    </Box>
  );
}
