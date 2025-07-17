import http from "@/core/services/interceptor";
import { loginResponseSchema, type TsignInInput } from "@/validation/zod";

export const login = async (credentials: TsignInInput) => {
  const response = await http.post("/login", credentials);

  const parsedResult = loginResponseSchema.safeParse(response.data);

  if (!parsedResult.success) {
    console.log(response.data);
    console.error("error in login.api", parsedResult.error.errors);

    return null;
  }

  return parsedResult.data;
};
