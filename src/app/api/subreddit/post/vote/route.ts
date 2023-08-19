import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { redis } from "@/lib/redis"
import { PostVoteValidator } from "@/lib/validators/vote"
import { CachedPost } from "@/types/redis"
import { z } from "zod"

//what will define a high engagement post
const CACHE_AFTER_UPVOTES = 5

//naming function http verb to handle
export async function PATCH(req: Request) {

    try {
        const body = await req.json()
        //destructuring the body 
        const { postId, voteType } = PostVoteValidator.parse(body)

        const session = await getAuthSession()
        //making sure user is logged in
        if (!session?.user) {
            return new Response("Unauthorized", { status: 401 })
        }

        //check if user has existing vote
        const existingVote = await db.vote.findFirst({
            where: {
                userId: session.user.id,
                postId,

            },
        })

        //fetch post
        const post = await db.post.findUnique({
            where: {
                id: postId
            },
            //include what we will cache for later
            include: {
                author: true,
                votes: true
            }
        })


        if (!post) {
            return new Response("Post not found", { status: 404 })
        }

        //if a vote already exists
        if (existingVote) {
            //if vote type is same as existing vote. i.e user previously upvotes then upvotes again
            if (existingVote.type === voteType) {
                await db.vote.delete({
                    where: {
                        userId_postId: {
                            postId,
                            userId: session.user.id
                        }
                    }
                })
                return new Response("OK")
            }
            //could have altered vote count so need to recount current votes
            await db.vote.update({
                where: {
                    userId_postId: {
                        postId,
                        userId: session.user.id
                    }
                },
                //the data to update
                data: {
                    //type in prisma Vote model
                    type: voteType
                }
            })
            //recounting votes
            //have to give reduce a starting value of 0 for TS to infer acc is anumber
            const votesAmt = post.votes.reduce((acc, vote) => {
                if (vote.type === "UP") {
                    return acc + 1
                }
                else if (vote.type === "DOWN") {
                    return acc - 1
                }
                else {
                    return acc
                }
            }, 0)
            //check to see if post is high engagement
            if (votesAmt >= CACHE_AFTER_UPVOTES) {
                const cachePayload: CachedPost = {
                    id: post.id,
                    title: post.title,
                    authorUsername: post.author.username ?? "",
                    content: JSON.stringify(post.content),
                    currentVote: voteType,
                    createdAt: post.createdAt
                }
                //caching the most important info for post detail page
                //redic docs: https://redis.io/docs/
                //hset sets specified fields to their respective values in the hash stored at "key"


                await redis.hset(`post:${postId}`, cachePayload)

            }
            return new Response("OK")

        }
        //create vote if no vote exists
        else if(!existingVote){
            await db.vote.create({
                data:{
                    type: voteType,
                    userId: session.user.id,
                    postId
                }
            })


            //recount votes to check for high engagement post
                 const votesAmt = post.votes.reduce((acc, vote) => {
                if (vote.type === "UP") {
                    return acc + 1
                }
                else if (vote.type === "DOWN") {
                    return acc - 1
                }
                else {
                    return acc
                }
            }, 0)
            //check to see if post is high engagement
            if (votesAmt >= CACHE_AFTER_UPVOTES) {
                const cachePayload: CachedPost = {
                    id: post.id,
                    title: post.title,
                    authorUsername: post.author.username ?? "",
                    content: JSON.stringify(post.content),
                    currentVote: voteType,
                    createdAt: post.createdAt
                }
                //caching the most important info for post detail page
                //redic docs: https://redis.io/docs/
                //hset sets specified fields to their respective values in the hash stored at "key"


                await redis.hset(`post:${postId}`, cachePayload)

            }
            return new Response("OK")
        }




    } catch (error) {
        if(error instanceof z.ZodError){
            //if error is from parsing, data is invalid
            return new Response("Invalid POST request data passed", {status: 422})
        }

        return new Response("Could not register your vote", {status: 500})

    }

}