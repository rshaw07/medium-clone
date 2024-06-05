import { z } from "zod";

export const signupInput = z.object({
  email: z.string().email(),
  password: z.string(),
  name: z.string(),
});

export const signinInput = z.object({
    email: z.string().email(),
    password: z.string(),
});

export const createBlogInput = z.object({
    title : z.string(),
    content : z.string(),
    draft : z.boolean(),
    tags: z.array(z.string())
});

export const updateBlogInput = z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    id: z.string(),
    image: z.string().optional(),
    draft: z.boolean().optional(),
    tags: z.array(z.string()).optional()
});


export type SignupInput = z.infer<typeof signupInput>;
export type SigninInput = z.infer<typeof signinInput>;
export type CreateBlogInput = z.infer<typeof createBlogInput>;
export type UpdateBlogInput = z.infer<typeof updateBlogInput>;