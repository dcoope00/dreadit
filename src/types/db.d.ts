import type {Post, Subreddit, User, Vote, Comment} from "@prisma/client"

//fetching multiple properties of post and joining them together
//no prisma type for this so declare it here

export type ExtendedPost = Post & {
    //properties from prisma client
    subreddit: Subreddit,
    votes: Vote[],
    author: User,
    comments: Comment[]

}