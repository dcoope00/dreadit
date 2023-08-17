


import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { PostValidator } from "@/lib/validators/post";
import { z } from "zod";

//an endpoint for components\Editor.tsx to publish posts on a subreddit
export async function POST(req: Request){
    try{
        const session = await getAuthSession()
        //determine if user is logged in
        if(!session?.user){
            //if there is no user logged in
            return new Response("Unauthorized", {status: 401 })
        }
  
        //convert the request to json 
        const body = await req.json()
        //validating the paylaod from dreadit\src\components\SubscribeLeaveToggle.tsx
        const {subredditId, title, content} = PostValidator.parse(body)
        //find out if subscription already exists
        const subscriptionExists = await db.subscription.findFirst({
            where:{
                subredditId,
                userId: session.user.id
            }
        })

       

        if(!subscriptionExists){
            return new Response("You must be subscribed to this subreddit to post", {status:400})
        }
        //creating a subscription to the subreddit
        await db.post.create({
            data:{
                title,
                content,
                subredditId: subredditId,
                authorId: session.user.id

            }
        })
        //return the initially passed subredditId as a successful response
        return new Response("Post successful", {status: 200})
    }catch(error){
        if(error instanceof z.ZodError){
            //if error is from parsing, data is invalid
            return new Response("Invalid request data passed", {status: 422})
        }

        return new Response("Could not post to subreddit", {status: 500})

    }

}