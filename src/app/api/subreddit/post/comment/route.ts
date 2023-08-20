import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { CommentValidator } from "@/lib/validators/comment";
import { z } from "zod";


export async function PATCH(req: Request){

    try{

        const session = await getAuthSession()
        if(!session?.user){
            //if there is no user logged in
            return new Response("Must be logged in to comment", {status: 401 })
        }

        const body = await req.json()
        const {postId, text, replyToId} = CommentValidator.parse(body)

        //create comment
        await db.comment.create({
            data:{
                text,
                postId,
                replyToId,
                authorId: session.user.id
            }
        })
        //api endpoints require a returned response
        return new Response("OK")
    }catch(error){
        if(error instanceof z.ZodError){
            //if error is from parsing, data is invalid
            return new Response("Invalid request data passed", {status: 422})
        }

        return new Response("Could not publish comment", {status: 500})

    }
    

}