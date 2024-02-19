import { z } from "zod";

export const signUpValidation = z.object({
    name: z.string().min(2, {message: "* Name must be longer"}),
    username: z.string().min(2, {message: "* Username must be longer"}),
    email: z.string().email(),
    password: z.string().min(8, { message: "* Password must be longer than 8 character"})
});

 
export const signInValidation = z.object({
  username: z.string().min(2, {message: "Username must be more than 2 character"}).max(50),
  password: z.string().min(8, {message: "Password must be at least 8 character"}),
})