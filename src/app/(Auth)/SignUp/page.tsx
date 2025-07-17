"use client";

import React, { useState } from "react";

import { signUpObject, TsignUpObject } from "@/validation/zod";
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

import { signup } from "@/core/services/api/auth/signup.api";
import showToast from "@/utils/showToast";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TsignUpObject>({
    resolver: zodResolver(signUpObject),
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (data: TsignUpObject) => {
    setIsLoading(true);
    console.log("login data", data);
    const result = await signup(data.id, data.name, data.password);

    if (result) {
      console.log("login success", result);
      showToast("ثبت نام با موفقیت انجام شد", "success", 3000);
    } else {
      console.log("login failed");
      showToast("خطا در ثبت نام", "error", 3000);
    }

    setIsLoading(false);
    reset();
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleSignUp)} noValidate>
      <Typography
        sx={{
          textAlign: "center",
          fontSize: "20px",
          fontWeight: "500",
        }}
      >
        ثبت نام
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
        error={!!errors.id}
        helperText={errors.id?.message}
      />
      <TextField
        {...register("name")}
        margin="normal"
        fullWidth
        name="name"
        label="نام"
        type="text"
        id="name"
        autoComplete="name"
        InputProps={{ sx: { borderRadius: 50 } }}
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <TextField
        {...register("password")}
        margin="normal"
        fullWidth
        name="password"
        label="رمزعبور"
        type="password"
        id="password"
        InputProps={{ sx: { borderRadius: 50 } }}
        error={!!errors.password}
        helperText={errors.password?.message}
      />

      <TextField
        {...register("confirmPassword")}
        margin="normal"
        fullWidth
        name="confirmPassword"
        label="تکرار رمزعبور"
        type="password"
        id="confirmPassword"
        InputProps={{ sx: { borderRadius: 50 } }}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
      />
      <TextField
        {...register("phone")}
        margin="normal"
        fullWidth
        name="phone"
        label="شماره تلفن همراه"
        type="phone"
        id="phone"
        InputProps={{ sx: { borderRadius: 50 } }}
        error={!!errors.phone}
        helperText={errors.phone?.message}
      />
      <Typography
        sx={{
          fontSize: "16px",
          padding: "5px",
        }}
      >
        حساب کاربری دارید؟ <Link href="/Login">وارد شوید</Link>
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
          <span>ثبت نام</span>
        )}
      </button>
    </Box>
  );
}
