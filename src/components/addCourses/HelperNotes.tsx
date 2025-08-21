import { Box, Typography } from "@mui/material";

export default function HelperNotes() {
  return (
    <Box mt={5} p={2} borderTop="1px solid" borderColor="primary.dark">
      <Typography fontWeight={700} mb={1} color="primary.dark">
        راهنمای استفاده
      </Typography>
      <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
        {[
          "تگ tbody کپی شده ی خود را در ورودی وارد کنید.",
          "جهت پیش نمایش و اعتبارسنجی ورودی، روی دکمه «تجزیه» کلیک کنید.",
          "برای پاک کردن ورودی، روی دکمه «پاک کردن» کلیک کنید.",
          "برای ارسال داده‌ها و بروزرسانی اطلاعات خود، روی دکمه «ارسال» کلیک کنید.",
        ].map((hint, idx) => (
          <Box
            key={idx}
            component="li"
            display="flex"
            alignItems="flex-start"
            gap={1}
            mb={0.5}
            color="primary.dark"
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
