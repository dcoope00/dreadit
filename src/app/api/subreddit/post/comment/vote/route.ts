import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { CommentVoteValidator } from "@/lib/validators/vote"
import { z } from "zod"


export async function PATCH(req: Request) {

    try {
        const body = await req.json()

        const { commentId, voteType } = CommentVoteValidator.parse(body)

        //getting current session
        const session = await getAuthSession()
        if (!session?.user) {
            return new Response("Unauthorized", { status: 401 })
        }
        //handling 3 cases of voting
        const existingVote = await db.commentVote.findFirst({
            where: {
                userId: session.user.id,
                commentId
            }

        })

    

        if (existingVote) {
            //if user is attempting to double vote. i.e 2 upvotes
            if (existingVote.type === voteType) {
                await db.commentVote.delete({
                    where: {
                        userId_commentId: {
                            userId: session.user.id,
                            commentId
                        }
                    }
                })
              
    
                return new Response("OK")
            }
            else{
                
            //vote exists, but is opposite vote, so update vote

            await db.commentVote.update({
                where: {
                    userId_commentId: {
                        commentId,
                        userId: session.user.id
                    }
                },
                data: {
                    type: voteType
                }
            })
            }


      
            return new Response("OK")
        }// end of existingVote if statement

        //if this is reached, there is no existing vote so create a new one
        await db.commentVote.create({
            data: {
                type: voteType,
                userId: session.user.id,
                commentId
            }

        })


     
        return new Response("OK")

    } catch (error) {
        if(error instanceof z.ZodError){
            //if error is from parsing, data is invalid
            return new Response("Invalid POST request data passed", {status: 422})
        }

        return new Response("Could not publish vote", {status: 500})

    }
}