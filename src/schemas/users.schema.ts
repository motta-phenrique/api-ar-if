import z from "zod";

export const userCreateSchema = z.object({
  name: z.string().min(3, "Name must have at least 3 characters"),
  email: z.email("Invalid email"),
  password: z.string().min(6, "Password must have at least 6 characters"),
});

export const userLoginSchema = z.object({
  email: z.email("Invalid email"),
  password: z.string().min(6, "Password must have at least 6 characters"),
})

export type UserCreateDto = z.infer<typeof userCreateSchema>
export type UserLoginDto = z.infer<typeof userLoginSchema>
