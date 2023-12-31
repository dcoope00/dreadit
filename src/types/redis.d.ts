import {VoteType} from "@prisma/client"

//typescript definition file

//defining what will be cached. most important info when displaying a post detail page
export type CachedPost = {
    //everything needs an ID. duh
    id: string
    title: string
    authorUsername: string
    //typing content as string since this will save as json
    content: string
    currentVote: Vote['type'] | null
    createdAt: Date

}