import { z } from "zod";

export const loginObject = z.object({
  id: z
    .string()
    .regex(/^\d+$/, { message: "شماره دانشجویی باید عدد باشد" })
    .min(9, { message: "شماره دانشجویی باید حداقل ۹ رقم باشد" })
    .max(11, { message: "شماره دانشجویی میتواند حداکثر ۱۱ رقم باشد" }),
  password: z.string(),
  // .min(8, { message: "رمز عبور باید حداقل ۸ کاراکتر باشد" }),
});

export type TloginObject = z.infer<typeof loginObject>;

export const signInInputSchema = z.object({
  id: z.string(),
  password: z.string(),
});
export type TsignInInput = z.infer<typeof signInInputSchema>;

export const loginResponseSchema = z
  .object({
    "access token": z.string().min(1).nullable(),
    admin: z.boolean().nullable(),
  })
  .strict();

export type TloginResponse = z.infer<typeof loginResponseSchema>;

export const signUpObject = z
  .object({
    id: z
      .string()
      .regex(/^\d+$/, { message: "شماره دانشجویی باید عدد باشد" })
      .min(9, { message: "شماره دانشجویی باید حداقل ۹ رقم باشد" })
      .max(11, { message: "شماره دانشجویی میتواند حداکثر ۱۱ رقم باشد" }),
    name: z.string().min(3, { message: "نام باید حداقل ۳ کاراکتر باشد" }),
    password: z
      .string()
      .min(8, { message: "رمز عبور باید حداقل ۸ کاراکتر باشد" }),
    confirmPassword: z.string(),
    phone: z
      .string()
      .regex(/^09[0-9]{9}/, { message: "شماره وارد شده معتبر نمی باشد" }),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "رمزعبور و تکرار رمزعبور مطابقت ندارند",
        path: ["confirmPassword"],
      });
    }
  });

export type TsignUpObject = z.infer<typeof signUpObject>;

export const signUpResponseSchema = z
  .object({
    "access token": z.string().min(1).nullable(),
    admin: z.boolean().nullable(),
  })
  .strict();

export type TsignUpResponse = z.infer<typeof signUpResponseSchema>;
