//zod is a schema validation lib
import {z} from "zod"

//defining a schema for creating a subreddit that the payload must match
export const SubredditValidator = z.object({
    name: z.string().min(3).max(21)
})
//defining a schema
export const SubredditSubscriptionValidator = z.object({
    subreditId: z.string()
})

export type CreateSubredditPayload = z.infer<typeof SubredditValidator>
export type SubscribeToSubredditPayload = z.infer<typeof SubredditSubscriptionValidator>