import { title } from "process";
import { string, z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(2, { message: "Password should be at least 2 characters long" })
    .max(20, { message: "Password should be 20 or more characters long" }),
});

export const registerSchema = z.object({
  role: string(),
  first_name: z
    .string({ message: "Only string" })
    .min(1, { message: "Name Must be 1 or more characters long" })
    .max(12, { message: "Name Must be 12 or more characters long" }),
  last_name: z.string({ message: "Only string" }).min(3).max(20),
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password should be at least 6 characters long" })
    .max(18, { message: "Password should be 20 or more characters long" }),
});
export const updateProfileSchema = z.object({
  first_name: z
    .string({ message: "Only string" })
    .min(1, { message: "Name Must be 1 or more characters long" })
    .max(12, { message: "Name Must be 12 or more characters long" }),
  last_name: z.string({ message: "Only string" }).min(3).max(20),
  email: z.string().email(),
  title: string(),
});

export const createTodoSchema = z.object({
  title: z.string(),
});
export const editTodoSchema = z.object({
  title: z.string(),
});
export const seachSchema = z.object({
  title: z.string(),
});
