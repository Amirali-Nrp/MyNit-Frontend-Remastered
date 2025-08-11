import { Box, Typography } from "@mui/material";

export default function UsageHints() {
  return (
    <Box mt={5} p={2} borderTop="1px solid #0f172a">
      <Typography fontWeight={700} mb={1} color="#0f172a">
        راهنمای استفاده
      </Typography>
      <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
        {[
          "برای انتخاب درس، روی خانه‌ی خالی جدول در روز و ساعت مورد نظر کلیک کنید.",
          "برای حذف یک درس، روی خانه‌ی پرشده کلیک کنید.",
          "اگر زمان کلاس یا امتحان با درس دیگری تداخل داشته باشد، پیغام هشدار نمایش داده می‌شود.",
          "در بخش «دروس انتخاب‌شده» می‌توانید کد درس را با کلیک کپی کنید.",
          "در بخش «امتحانات انتخاب‌شده» می‌توانید با زدن علامت حذف، درس را از برنامه حذف کنید.",
        ].map((hint, idx) => (
          <Box
            key={idx}
            component="li"
            display="flex"
            alignItems="flex-start"
            gap={1}
            mb={0.5}
            color="#0f172a"
          >
            *
            <Typography variant="body2" color="text.secondary">
              {hint}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
