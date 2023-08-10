

//a route component named with nextjs naming conventions.
//all files under the api folder must be named route.ts

import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { SubredditValidator } from "@/lib/validators/subreddit";
import { z } from "zod";

//exporting an async POST request where the type is a React Request type

export async function POST(req: Request) {

    try{
        //determine if user is logged in
        const session = await getAuthSession()

        if(!session?.user){
            return new Response("Unauthorized", {status: 401})
        }
        //req.json() reads the req.body and returns a promise that parses the body as json
        const body = await req.json()
        //using the SubredditValidator from /lib/validators/subreddit to validate the data in the req.json()
        //if it is successful there is a name according to the validator schema
        //will throw a ZodError if failed
        const {name} = SubredditValidator.parse(body)

        //checking if the subreddit exists already in the database
        const subredditExists = await db.subreddit.findFirst({
            where: {
                name,
            }
        })
        //if it does throw error
        if(subredditExists){
            return new Response("Subreddit already exists", {status: 409})
        }
        //if it doesnt, create it passing the name of the subreddit recieved from the SubredditVaildator
        //and the id of the user creating it
        const subreddit = await db.subreddit.create({
            data: {
                name,
                creatorId: session.user.id
            }
        })

        //subscribe the creator to the subreddit with the userId and subredditId
        await db.subscription.create({
            data:{
                userId: session.user.id,
                subredditId: subreddit.id
            }
        })
        //return subreddit name as successful respone to handle on frontend in \d\create\page.tsx
        return new Response(subreddit.name)

    }catch(error){
        if(error instanceof z.ZodError){
            //if error is from parsing, data is invalid
            return new Response(error.message, {status: 422})
        }

        return new Response("Could not create subreddit", {status: 500})
    }
}