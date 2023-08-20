import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { redis } from "@/lib/redis"
import { PostVoteValidator } from "@/lib/validators/vote"
import { CachedPost } from "@/types/redis"
import { z } from "zod"

//how many votes required to show in upstash
const CACHE_AFTER_UPVOTES = 1
export async function PATCH(req: Request) {

    try {
        const body = await req.json()

        const { postId, voteType } = PostVoteValidator.parse(body)

        //getting current session
        const session = await getAuthSession()
        if (!session?.user) {
            return new Response("Unauthorized", { status: 401 })
        }
        //handling 3 cases of voting
        const existingVote = await db.vote.findFirst({
            where: {
                userId: session.user.id,
                postId
            }

        })

        const post = await db.post.findUnique({
            where: {
                id: postId
            },
            include: {
                author: true,
                votes: true,

            }
        })

        if (!post) {
            return new Response("Post not found", { status: 404 })
        }

        if (existingVote) {
            //if user is attempting to double vote. i.e 2 upvotes
            if (existingVote.type === voteType) {
                await db.vote.delete({
                    where: {
                        userId_postId: {
                            userId: session.user.id,
                            postId
                        }
                    }
                })
               
                const votesAmt = post.votes.reduce((acc, vote) => {
                    if (vote.type === "UP") {
                        return acc + 1
                    }
                    if (vote.type === "DOWN") {
                        return acc - 1
                    }
                    return acc
                }, 0)
    
                if (votesAmt >= CACHE_AFTER_UPVOTES) {
                    const cachePayload: CachedPost = {
                        authorUsername: post.author.username ?? "",
                        content: JSON.stringify(post.content),
                        id: post.id,
                        title: post.title,
                        createdAt: post.createdAt,
                        currentVote: voteType
                    }
                    //sets specified fields to respective values in hash stored at "key"
                    //passing cachePayload will automatically put everything into fields
                    await redis.hset(`post:${postId}`, cachePayload)
                }
                return new Response("OK")
            }

            //vote exists, but is opposite vote, so update vote

            await db.vote.update({
                where: {
                    userId_postId: {
                        postId,
                        userId: session.user.id
                    }
                },
                data: {
                    type: voteType
                }
            })

            //recount votes since update could have changed vote count
            const votesAmt = post.votes.reduce((acc, vote) => {
                if (vote.type === "UP") {
                    return acc + 1
                }
                if (vote.type === "DOWN") {
                    return acc - 1
                }
                return acc
            }, 0)

            if (votesAmt >= CACHE_AFTER_UPVOTES) {
                const cachePayload: CachedPost = {
                    authorUsername: post.author.username ?? "",
                    content: JSON.stringify(post.content),
                    id: post.id,
                    title: post.title,
                    createdAt: post.createdAt,
                    currentVote: voteType
                }
                //sets specified fields to respective values in hash stored at "key"
                //passing cachePayload will automatically put everything into fields
                await redis.hset(`post:${postId}`, cachePayload)
            }
            return new Response("OK")
        }// end of existingVote if statement

        //if this is reached, there is no existing vote so create a new one
        await db.vote.create({
            data: {
                type: voteType,
                userId: session.user.id,
                postId
            }

        })

        //recount votes since update could have changed vote count
        const votesAmt = post.votes.reduce((acc, vote) => {
            if (vote.type === "UP") {
                return acc + 1
            }
            if (vote.type === "DOWN") {
                return acc - 1
            }
            return acc
        }, 0)

        if (votesAmt >= CACHE_AFTER_UPVOTES) {
            const cachePayload: CachedPost = {
                authorUsername: post.author.username ?? "",
                content: JSON.stringify(post.content),
                id: post.id,
                title: post.title,
                createdAt: post.createdAt,
                currentVote: voteType
            }
            //sets specified fields to respective values in hash stored at "key"
            //passing cachePayload will automatically put everything into fields
            await redis.hset(`post:${postId}`, cachePayload)
        }
        return new Response("OK")

    } catch (error) {
        if(error instanceof z.ZodError){
            //if error is from parsing, data is invalid
            return new Response("Invalid POST request data passed", {status: 422})
        }

        return new Response("Could not publish vote", {status: 500})

    }
}