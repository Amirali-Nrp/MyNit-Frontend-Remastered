import React from "react";

import { DayKey, TIME_SLOTS, WEEK_DAYS } from "@/constants";
import { DayTime, Eligible } from "@/types";
import { parseGroup, rangesOverlap } from "@/utils/utils";
import { Box, Card, CardContent, Chip, Typography } from "@mui/material";

interface ScheduleTableProps {
  selected: Record<string, Eligible>;
}

export default function ScheduleTable({ selected }: ScheduleTableProps) {
  const courseAt = (day: DayKey, slotIdx: number) => {
    const slot = TIME_SLOTS[slotIdx];
    return Object.values(selected).find((c) => {
      const dt = (c.dateAndTime as any)[day] as DayTime | undefined;
      return dt ? rangesOverlap(dt.from, dt.to, slot.from, slot.to) : false;
    });
  };

  return (
    <Box
      display="grid"
      gridTemplateColumns={`140px repeat(${TIME_SLOTS.length}, 1fr)`}
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        border: "1px solid #e5e7eb",
        boxShadow: "0 6px 20px rgba(2,6,23,.06)",
        background: "linear-gradient(180deg,#ffffff, #fbfdff)",
      }}
    >
      <Box sx={{ bgcolor: "primary.dark", p: 2 }}>
        <Typography fontWeight={700} color="#fff">
          روز / ساعت
        </Typography>
      </Box>
      {TIME_SLOTS.map((s, cIdx) => (
        <Box key={s.id} sx={{ p: 2, bgcolor: "primary.dark" }}>
          <Typography
            variant="body2"
            textAlign="center"
            fontWeight={700}
            color="#fff"
          >
            {s.label}
          </Typography>
        </Box>
      ))}

      {WEEK_DAYS.map((d) => (
        <React.Fragment key={d.key}>
          <Box
            sx={{ p: 2, bgcolor: "#ffffff", borderTop: "1px solid #e5e7eb" }}
          >
            <Typography fontWeight={700} color="primary.dark">
              {d.label}
            </Typography>
          </Box>
          {TIME_SLOTS.map((s, cIdx) => {
            const occupying = courseAt(d.key, cIdx);
            const colBg = cIdx % 2 === 0 ? "#f8fafc" : "#eef2ff";
            return (
              <Box
                key={`${d.key}-${s.id}`}
                sx={{
                  p: 1.5,
                  minHeight: 92,
                  borderTop: "1px solid #e5e7eb",
                  borderLeft: "1px solid #e5e7eb",
                  bgcolor: colBg,
                }}
              >
                {occupying ? (
                  <Card
                    elevation={0}
                    sx={{
                      bgcolor: "#ffffff",
                      border: "1px solid #e2e8f0",
                      borderRadius: 3,
                      height: "100%",
                    }}
                  >
                    <CardContent sx={{ p: 1.5 }}>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        gap={1}
                      >
                        <Box>
                          <Typography
                            fontWeight={700}
                            fontSize={14}
                            color="primary.dark"
                          >
                            {occupying.courseName}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {occupying.professor}
                          </Typography>
                        </Box>
                        <Box display="flex" flexDirection="column" gap={1}>
                          <Chip
                            label={`${occupying.totalUnit} واحد`}
                            size="small"
                          />
                          <Chip
                            label={`گروه ${parseGroup(occupying.courseID)}`}
                            size="small"
                          />
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                ) : (
                  ""
                )}
              </Box>
            );
          })}
        </React.Fragment>
      ))}
    </Box>
  );
}
