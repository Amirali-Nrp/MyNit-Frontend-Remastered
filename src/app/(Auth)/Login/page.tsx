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

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TloginObject>({
    resolver: zodResolver(loginObject),
  });

  const handleLogin = (data: TloginObject) => {
    console.log("login data", data);
    // TODO: login request
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
        {...register("studentNumber")}
        margin="normal"
        fullWidth
        id="studentNumber"
        label="شماره دانشجویی"
        name="studentNumber"
        autoComplete="studentNumber"
        autoFocus
        InputProps={{
          sx: { borderRadius: 50 },
          inputMode: "numeric",
        }}
        InputLabelProps={{
          sx: { fontFamily: "vazirmatn" },
        }}
        error={!!errors.studentNumber}
        helperText={errors.studentNumber?.message}
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
      <button className="button-48">
        {isSubmitting ? (
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
