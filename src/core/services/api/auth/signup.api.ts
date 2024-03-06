"use server";

import http from "@/core/services/interceptor";
import { signUpResponseSchema } from "@/validation/zod";

export const signup = async (id: string, name: string, password: string) => {
  const response = await http.post("/signup", {
    password: password,
    name: name,
    id: id,
  });

  const parsedResult = signUpResponseSchema.safeParse(response.data);

  if (!parsedResult.success) {
    console.log(response.data);
    console.error("error in login.api", parsedResult.error.errors);

    return null;
  }

  return parsedResult.data;
};
