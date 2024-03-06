import { z } from "zod";

export const loginObject = z.object({
  studentNumber: z
    .string()
    .regex(/^\d+$/, { message: "شماره دانشجویی باید عدد باشد" })
    .min(9, { message: "شماره دانشجویی باید حداقل ۹ رقم باشد" })
    .max(11, { message: "شماره دانشجویی میتواند حداکثر ۱۱ رقم باشد" }),
  password: z
    .string()
    .min(8, { message: "رمز عبور باید حداقل ۸ کاراکتر باشد" }),
});

export type TloginObject = z.infer<typeof loginObject>;
