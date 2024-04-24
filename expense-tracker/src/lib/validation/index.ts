import * as z from "zod";

export const SignupValidation = z.object({
  name: z
    .string()
    .min(2, { message: "Name should be at least 2 symbols" })
    .max(50, { message: "Name should not be more than 50 symbols" }),
  username: z
    .string()
    .min(2, { message: "Username should be at least 2 symbols" })
    .max(50, { message: "Username should not be more than 50 symbols" }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password should be at least 8 characters." }),
});

export const SigninValidation = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password should be at least 8 characters." }),
});

export const CreateExpenseValidation = z.object({
  type: z.string(),
  amount: z.preprocess(
    (a) => parseInt(z.string().parse(a), 10) * 100,
    z.number().positive("Must be positive").finite()
  ),
  description: z.string().max(255, "Description is too long"),
});
