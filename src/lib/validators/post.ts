

import {z} from "zod"
//will validate submitted data on both client/server side
export const PostValidator = z.object({
    title: z.string()
    .min(3, {message: "Title must be longer that 3 characters"})
    .max(128, {message:"Title must be shorter than 128 characters" }),
    subredditId: z.string(),
    //typing content as any because the editor has specific format
    content: z.any()
})


export type PostCreationRequest = z.infer<typeof PostValidator>