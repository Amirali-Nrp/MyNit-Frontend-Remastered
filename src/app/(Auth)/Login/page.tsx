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

import { loginAction } from "@/core/actions";
import showToast from "@/utils/showToast";

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

  const handleLogin = async (data: TloginObject) => {
    setIsLoading(true);
    console.log("login data", data);
    const result = await loginAction(data);

    if (result == "Success") {
      console.log("login success");
      showToast("ورود با موفقیت انجام شد", "success", 3000);
    } else {
      console.log("login failed");
      showToast("خطا در ورود", "error", 3000);
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
        id="id"
        label="شماره دانشجویی"
        name="id"
        autoComplete="id"
        autoFocus
        InputProps={{
          sx: { borderRadius: 50 },
          inputMode: "numeric",
        }}
        InputLabelProps={{
          sx: { fontFamily: "vazirmatn" },
        }}
        error={!!errors.id}
        helperText={errors.id?.message}
      />
      <TextField
        {...register("password")}
        margin="normal"
        fullWidth
        name="password"
        label="رمزعبور"
        type="password"
        id="password"
        autoComplete="current-password"
        InputProps={{ sx: { borderRadius: 50 } }}
        InputLabelProps={{
          sx: { fontFamily: "vazirmatn" },
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
        حساب کاربری ندارید؟ <Link href="/SignUp">ثبت نام کنید</Link>
      </Typography>
      <button className="button-48" disabled={isLoading || isSubmitting} type="submit">
        {isSubmitting || isLoading ? (
          <div className="flex w-full items-center justify-center">
            <CircularProgress />
          </div>
        ) : (
          <span>ورود</span>
        )}
      </button>
    </Box>
  );
};

export default Login;
