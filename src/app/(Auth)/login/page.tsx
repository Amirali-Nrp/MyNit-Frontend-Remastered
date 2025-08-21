"use client";

import { loginObject, TloginObject } from "@/validation/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, CircularProgress, Link, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

import "@/app/button.css";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { loginAction } from "@/core/actions";
import showToast from "@/utils/showToast";

import StudentIdField from "@/components/Auth/Login/StudentIdField";
import PasswordField from "@/components/Auth/PasswordField";
import BackButton from "@/components/Buttons/BackButton";
import Button48 from "@/components/Buttons/Button48";

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TloginObject>({ resolver: zodResolver(loginObject) });

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (data: TloginObject) => {
    setIsLoading(true);
    const result = await loginAction(data);

    if (result === "Success") {
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
        sx={{ textAlign: "center", fontSize: "21px", fontWeight: 550 }}
      >
        ورود به حساب کاربری
      </Typography>

      <StudentIdField
        register={register}
        error={errors.id}
        helperText={errors.id?.message}
      />

      <PasswordField
        register={register}
        name="password"
        label="رمزعبور"
        error={errors.password}
        helperText={errors.password?.message}
      />

      <Typography
        sx={{ textAlign: "left", fontSize: "16px", fontWeight: 500, m: "5px" }}
      >
        حساب کاربری ندارید؟{" "}
        <Link href="/register" color="primary.light">
          ثبت نام کنید
        </Link>
      </Typography>

      <Button48
        loading={isLoading || isSubmitting}
        type="submit"
        label="ورود"
      />

      <BackButton />
    </Box>
  );
}
