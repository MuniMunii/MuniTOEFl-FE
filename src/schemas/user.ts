import {z}from "zod"
export const userSchemas=z.object({
    email:z.email(),
    image:z.string(),
    id:z.string(),
    role:z.enum(['user','admin']),
    username:z.string()
})
export type UserType=z.infer<typeof userSchemas>