// components/admin/StudentCard.tsx
"use client";

import Link from "next/link";

import { TStudentCard } from "@/types";
import BadgeRoundedIcon from "@mui/icons-material/BadgeRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

interface Props {
  student: TStudentCard;
  onDeleteClick: (student: TStudentCard) => void;
}

function initials(name: string) {
  const parts = name.trim().split(" ");
  const a = parts[0]?.[0] ?? "";
  const b = parts[1]?.[0] ?? "";
  return (a + b).toUpperCase();
}

export default function StudentCard({ student, onDeleteClick }: Props) {
  return (
    <Card
      variant="outlined"
      dir="rtl"
      sx={{
        width: "100%", // کارت تمام‌عرض آیتم
        maxWidth: { xs: "100%", sm: 520 }, // سقف معقول روی دسکتاپ/تبلت
        minWidth: { xs: "100%", sm: 320 }, // کف برای جلوگیری از خیلی باریک شدن
        mx: "auto", // مرکز در آیتم
        height: "100%",
        borderRadius: 3,
        overflow: "hidden",
        "& .MuiCardHeader-root": { py: 1.25, px: 1.5 },
        "& .MuiCardContent-root": { py: 1, px: 1.5 },
        "& .MuiCardActions-root": { py: 1, px: 1.25 },
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ width: 36, height: 36, fontSize: 14 }}>
            {initials(student.name)}
          </Avatar>
        }
        title={
          <Stack direction="row" alignItems="center" spacing={0.75}>
            <BadgeRoundedIcon fontSize="small" />
            <Typography variant="subtitle1" fontWeight={700}>
              {student.name}
            </Typography>
          </Stack>
        }
        subheader={
          <Stack
            direction="row"
            spacing={0.5}
            mt={0.5}
            useFlexGap
            flexWrap="wrap"
          >
            <Chip
              size="small"
              label={`شماره دانشجویی: ${student.id}`}
              variant="outlined"
            />
            <Chip size="small" label={`ورودی: ${student.entry}`} />
            <Chip size="small" label={student.period} variant="outlined" />
          </Stack>
        }
      />

      <Divider sx={{ mx: 1.5 }} />

      <CardContent>
        <Stack spacing={0.5}>
          <Stack direction="row" alignItems="center" spacing={0.75}>
            <SchoolRoundedIcon fontSize="small" />
            <Typography variant="body2" color="text.secondary">
              دانشکده:
            </Typography>
            <Typography variant="body2">{student.college}</Typography>
          </Stack>
        </Stack>
      </CardContent>

      <CardActions sx={{ justifyContent: "space-between" }}>
        <Tooltip title="نمایش اطلاعات">
          <Button
            component={Link}
            href={`/admin/studentInfo/${student.id}`}
            variant="contained"
            size="small"
            startIcon={<VisibilityRoundedIcon />}
            sx={{ borderRadius: 2 }}
          >
            اطلاعات
          </Button>
        </Tooltip>

        <Tooltip title="حذف دانشجو">
          <Button
            color="error"
            variant="text"
            size="small"
            startIcon={<DeleteOutlineRoundedIcon />}
            onClick={() => onDeleteClick(student)}
            sx={{ borderRadius: 2 }}
          >
            حذف
          </Button>
        </Tooltip>
      </CardActions>
    </Card>
  );
}
