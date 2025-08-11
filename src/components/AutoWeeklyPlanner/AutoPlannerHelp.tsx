import { Box, Typography } from "@mui/material";

export default function AutoPlannerHelp() {
  return (
    <Box mt={5} p={2} borderTop="1px solid #0f172a">
      <Typography fontWeight={700} mb={1} color="#0f172a">
        راهنمای استفاده
      </Typography>
      <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
        {[
          "برای اضافه کردن یک درس، روی خانه‌ی خالی یا روی آن کلیک کنید.",
          "برای حذف یک درس، روی خانه‌ی پرشده کلیک کنید.",
          "حداقل تعداد واحدهای انتخاب‌شده باید ۱۲ باشد.",
          "با کلیک روی دکمه «برنامه‌ریزی هفتگی» می‌توانید برنامه‌ریزی را آغاز کنید.",
          "در بخش «برنامه‌های پیشنهادی» می‌توانید برنامه‌های مختلف را مشاهده کنید.",
          "با کلیک روی دکمه «بعدی» به برنامه‌ی بعدی نمایش داده می‌شود.",
          "با کلیک روی دکمه «قبلی» به برنامه‌ی قبلی نمایش داده می‌شود.",
          "در بخش «دروس انتخاب‌شده» می‌توانید کد درس را با کلیک کپی کنید.",
          "با کلیک روی دکمه «بازنشانی»  می‌توانید مجدداً درس انتخاب کنید.",
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
