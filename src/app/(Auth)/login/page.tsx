"use client";

import { loginObject, TloginObject } from "@/validation/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  CircularProgress,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";

import "@/app/button.css";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { loginAction } from "@/core/actions";
import showToast from "@/utils/showToast";

import BackButton from "@/components/Buttons/BackButton";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TloginObject>({
    resolver: zodResolver(loginObject),
  });

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async (data: TloginObject) => {
    setIsLoading(true);
    const result = await loginAction(data);

    if (result == "Success") {
      showToast("ورود با موفقیت انجام شد", "success", 3000);
      router.push("/dashboard");
    } else {
      showToast("شماره دانشجویی یا رمز عبور نادرست است", "error", 3000);
    }

    setIsLoading(false);
    reset();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleLogin)}
      noValidate
      sx={{ mt: 1 }}
    >
      <Typography
        sx={{
          textAlign: "center",
          fontSize: "21px",
          fontWeight: "550",
        }}
      >
        ورود به حساب کاربری
      </Typography>
      <TextField
        {...register("id")}
        margin="normal"
        fullWidth
        required
        id="id"
        label="شماره دانشجویی"
        name="id"
        autoComplete="id"
        autoFocus
        sx={{
          "& label.Mui-focused": {
            color: "white",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "white",
            },
            "&:hover fieldset": {
              borderColor: "white",
            },
            "&.Mui-focused fieldset": {
              borderColor: "white",
            },
          },
        }}
        InputProps={{
          sx: { borderRadius: 50, color: "white" },
          inputMode: "numeric",
        }}
        InputLabelProps={{
          sx: { fontFamily: "vazirmatn", color: "white" },
        }}
        error={!!errors.id}
        helperText={errors.id?.message}
      />
      <TextField
        {...register("password")}
        margin="normal"
        fullWidth
        required
        name="password"
        label="رمزعبور"
        type="password"
        id="password"
        autoComplete="current-password"
        sx={{
          "& label.Mui-focused": {
            color: "white",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "white",
            },
            "&:hover fieldset": {
              borderColor: "white",
            },
            "&.Mui-focused fieldset": {
              borderColor: "white",
            },
          },
        }}
        InputProps={{ sx: { borderRadius: 50, color: "white" } }}
        InputLabelProps={{
          sx: { fontFamily: "vazirmatn", color: "white" },
        }}
        error={!!errors.password}
        helperText={errors.password?.message}
      />
      {/* <FormControlLabel
    control={<Checkbox value="remember" color="primary" />}
    label={
      <Typography fontFamily="Vazirmatn">مرا به خاطر بسپار</Typography>
    }
    sx={{ marginLeft: 1, direction: "rtl" }}
  /> */}
      <Typography
        sx={{
          textAlign: "left",
          fontSize: "16px",
          fontWeight: "500",
          margin: "5px",
        }}
      >
        حساب کاربری ندارید؟ <Link href="/register">ثبت نام کنید</Link>
      </Typography>
      <button
        className="button-48"
        disabled={isLoading || isSubmitting}
        type="submit"
      >
        {isSubmitting || isLoading ? (
          <div className="flex w-full items-center justify-center">
            <CircularProgress />
          </div>
        ) : (
          <span>ورود</span>
        )}
      </button>
      <BackButton />
    </Box>
  );
};

export default Login;
