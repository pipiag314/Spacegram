import { z } from "zod";

export const signUpValidation = z.object({
    name: z.string().min(2, {message: "* Name must be longer"}),
    username: z.string().min(2, {message: "* Username must be longer"}),
    email: z.string().email(),
    password: z.string().min(8, { message: "* Password must be longer than 8 character"})
});

 
export const signInValidation = z.object({
  email: z.string().email({message: "* Invalid Email"}),
  password: z.string().min(8, {message: "* Password must be at least 8 character"}),
})


const MAX_FILE_SIZE = 1024 * 1024 * 5;

export const createPostValidation = z.object({
  caption: z.string().min(2, {
    message: "Captions must be at least 2 characters.",
  }),
  file: z.instanceof(File).refine((file) => {
    return !file || file.size <= MAX_FILE_SIZE
  }, "File size must be less than 5MB"),
  tags: z.string().optional()
});