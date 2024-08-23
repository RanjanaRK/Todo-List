import { z } from "zod";
import {
  createTodoSchema,
  editTodoSchema,
  loginSchema,
  registerSchema,
  seachSchema,
  updateProfileSchema,
} from "./zodSchema";
import { User } from "@directus/types";

export type LoginSchemaType = z.infer<typeof loginSchema>;
export type RegisterSchemaType = z.infer<typeof registerSchema>;
export type CreateTodoSchemaType = z.infer<typeof createTodoSchema>;
export type EditTodoSchemaType = z.infer<typeof editTodoSchema>;
export type UpdateProfileType = z.infer<typeof updateProfileSchema>;
export type searchType = z.infer<typeof seachSchema>;

export interface TodoSchema {
  id: string;
  user_created?: User;
  date_created: string;
  title: string;
}

export type UserType = {
  userInfo: User;
};
export interface DirectusType {
  todos: TodoSchema[];
}
