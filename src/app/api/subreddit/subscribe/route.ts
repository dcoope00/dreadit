import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { SubredditSubscriptionValidator } from "@/lib/validators/subreddit";
import { z } from "zod";

//a component for subscribing to a subreddit
//this file will serve as an endpoint for the axios.post in \components\SubscribeLeaveToggle.tsx
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
        const {subredditId} = SubredditSubscriptionValidator.parse(body)
        //find out if subscription already exists
        const subscriptionExists = await db.subscription.findFirst({
            where:{
                subredditId,
                userId: session.user.id
            }
        })

       

        if(subscriptionExists){
            return new Response("You are already subscribed to this subreddit you silly goose!", {status:400})
        }
        //creating a subscription to the subreddit
        await db.subscription.create({
            data:{
                userId: session.user.id,
                subredditId

            }
        })
        //return the initially passed subredditId as a successful response
        return new Response(subredditId)
    }catch(error){
        if(error instanceof z.ZodError){
            //if error is from parsing, data is invalid
            return new Response("Invalid request data passed", {status: 422})
        }

        return new Response("Could not subscribe to subreddit", {status: 500})

    }

}