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

import { useRouter } from "next/navigation";

import { signup } from "@/core/services/api/auth/signup.api";
import showToast from "@/utils/showToast";

// ⬇️ NEW: use the generic PasswordField for show/hide and clean RHF wiring
import PasswordField from "@/components/Auth/PasswordField";
import BackButton from "@/components/Buttons/BackButton";
import Button48 from "@/components/Buttons/Button48";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TsignUpObject>({
    resolver: zodResolver(signUpObject),
  });

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (data: TsignUpObject) => {
    setIsLoading(true);
    const result = await signup(data.id, data.name, data.password);

    if (result.ok) {
      showToast("ثبت نام با موفقیت انجام شد", "success", 3000);
      router.push("/");
    } else {
      showToast(result.message, "error", 3000);
    }

    setIsLoading(false);
    reset();
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleSignUp)} noValidate>
      <Typography
        sx={{ textAlign: "center", fontSize: "21px", fontWeight: "550" }}
      >
        ثبت نام
      </Typography>

      {/* Student ID */}
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
          "& label.Mui-focused": { color: "white" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "white" },
            "&:hover fieldset": { borderColor: "white" },
            "&.Mui-focused fieldset": { borderColor: "white" },
          },
        }}
        InputProps={{
          sx: { borderRadius: 50, color: "white" },
          inputMode: "numeric",
        }}
        InputLabelProps={{ sx: { fontFamily: "vazirmatn", color: "white" } }}
        error={!!errors.id}
        helperText={errors.id?.message}
      />

      {/* Name */}
      <TextField
        {...register("name")}
        margin="normal"
        fullWidth
        required
        name="name"
        label="نام"
        type="text"
        id="name"
        autoComplete="name"
        sx={{
          "& label.Mui-focused": { color: "white" },
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "white" },
            "&:hover fieldset": { borderColor: "white" },
            "&.Mui-focused fieldset": { borderColor: "white" },
          },
        }}
        InputProps={{ sx: { borderRadius: 50, color: "white" } }}
        InputLabelProps={{ sx: { fontFamily: "vazirmatn", color: "white" } }}
        error={!!errors.name}
        helperText={errors.name?.message}
      />

      {/* Password (show/hide) */}
      <PasswordField
        register={register}
        name="password"
        label="رمزعبور"
        autoComplete="new-password"
        error={errors.password}
        helperText={errors.password?.message}
      />

      <PasswordField
        register={register}
        name="confirmPassword"
        label="تکرار رمزعبور"
        autoComplete="new-password"
        error={errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
      />

      <Typography sx={{ fontSize: "16px", padding: "5px" }}>
        حساب کاربری دارید؟{" "}
        <Link href="/login" color="primary.light">
          وارد شوید
        </Link>
      </Typography>

      <Button48
        loading={isLoading || isSubmitting}
        type="submit"
        label="ثبت نام"
      />

      <BackButton />
    </Box>
  );
}
