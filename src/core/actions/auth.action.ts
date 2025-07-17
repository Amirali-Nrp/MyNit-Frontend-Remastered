"use server";

import { type TsignInInput } from "@/validation/zod";

import { signIn, signOut } from "@/lib/auth";

export const loginAction = async (data: TsignInInput) => {
  try {
    await signIn("credentials", {
      ...data,
      redirect: false,
    });

    return "Success";
  } catch (err) {
    if ((err as Error).message.includes("CredentialsSignin")) {
      return "Invalid credentials";
    }

    console.log(err);

    return "Something went wrong";
  }
};

export const logOutAction = async () => {
  try {
    await signOut({
      redirect: false,
    });

    return true;
  } catch (err) {
    console.log(err);

    return false;
  }
};
