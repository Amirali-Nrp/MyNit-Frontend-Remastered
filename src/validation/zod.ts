import { z } from "zod";

export const loginObject = z.object({
  id: z
    .string()
    .regex(/^\d+$/, { message: "شماره دانشجویی باید عدد باشد" })
    .min(9, { message: "شماره دانشجویی باید حداقل ۹ رقم باشد" })
    .max(11, { message: "شماره دانشجویی میتواند حداکثر ۱۱ رقم باشد" }),
  password: z
    .string({ required_error: "رمز عبور الزامی است" })
    .trim()
    .min(8, { message: "رمز عبور باید حداقل ۸ کاراکتر باشد" }),
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
    // phone: z
    //   .string()
    //   .regex(/^09[0-9]{9}/, { message: "شماره وارد شده معتبر نمی باشد" }),
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

// Reqs schema
export const ReqsSchema = z.object({
  id: z.number(),
  name: z.string(),
});

// Course schema
export const CourseSchema = z.object({
  id: z.number(),
  name: z.string(),
  units: z.number(),
  lesson_group: z.number(),
  pre_reqs: z.array(ReqsSchema),
  co_reqs: z.array(ReqsSchema),
  passed: z.string(),
  mark: z.number(),
});

// Date and time for scheduling
const DayTimeSchema = z.object({
  from: z.string(),
  to: z.string(),
});

const ExamSchema = z.object({
  date: z.string(),
  time: z.string(),
});

export const DateAndTimeSchema = z.object({
  saturday: DayTimeSchema.optional(),
  sunday: DayTimeSchema.optional(),
  monday: DayTimeSchema.optional(),
  tuesday: DayTimeSchema.optional(),
  wednesday: DayTimeSchema.optional(),
  exam: ExamSchema.optional(),
});

// Eligible schema
export const EligibleSchema = z.object({
  collegeID: z.string(),
  collegeName: z.string(),
  groupID: z.number(),
  groupName: z.string(),
  courseID: z.string(),
  courseName: z.string(),
  totalUnit: z.number(),
  practicalUnit: z.number(),
  capacity: z.number(),
  registeredCount: z.number(),
  waitListCount: z.number(),
  gender: z.string(),
  professor: z.string(),
  dateAndTime: DateAndTimeSchema,
  description: z.string(),
});

// Term schema
export const TermSchema = z.object({
  term_number: z.number(),
  courses: z.array(CourseSchema),
  total_units: z.number(),
  total_passed: z.number().optional(),
  grade: z.number().optional(),
});

// Student schema
export const StudentSchema = z.object({
  student_id: z.number(),
  name: z.string(),
  passed_units: z.number(),
  terms: z.array(TermSchema),
  remaining_terms: z.array(TermSchema),
  eligibles: z.array(EligibleSchema),
});

export type Student = z.infer<typeof StudentSchema>;
