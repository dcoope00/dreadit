import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { z } from "zod"

//displaying posts besides the initial posts
export async function GET(req: Request){
    //using the URL class to instantiate a new URL
    const url = new URL(req.url)
    
    //is user logged in
    const session = await getAuthSession()

    let followedCommunitiesIds: string[] = []
    //if user is logged in determine communities they are following
    if(session){
        const followedCommunities = await db.subscription.findMany({
            where:{
                userId: session.user.id
            },
            include:{
                subreddit: true
            }
            
        })
        followedCommunitiesIds = followedCommunities.map(({subreddit}) => {
            return subreddit.id
        })
    }
    //data fetching logic whether user is logged in or not

    try{
        //defining inline zod validator since it will only be used here
        const {limit, page, subredditName} = z.object({
            limit: z.string(),
            page: z.string(),
            //subreddit is optional
            subredditName: z.string().nullish().optional(),
        }).parse({
            subredditName: url.searchParams.get("subredditName"),
            limit: url.searchParams.get("limit"),
            page: url.searchParams.get("page")
        })
        //conditionally defined whereClause below
        let whereClause = {}
        //if user is inside a subreddit
        if(subredditName){
            whereClause = {
                subreddit: {
                    name: subredditName
                }
            }
        }else if (session){
            whereClause = {
                subreddit: {
                    id: {
                        //in is a prisma operator to designate where the info is found
                        in: followedCommunitiesIds
                    }
                }
            }
        }
        //fetching posts for infinite scrolling
        const posts = await db.post.findMany({
           take: parseInt(limit),
           //only showing posts that have not been shown
           skip: (parseInt(page)-1)* parseInt(limit),
           orderBy:{
            createdAt: "desc"
           },
           include:{
            subreddit: true,
            votes: true,
            author: true,
            comments: true
           },
           where: whereClause
        })
        return new Response(JSON.stringify(posts))
    }catch(error){
        if(error instanceof z.ZodError){
            //if error is from parsing, data is invalid
            return new Response("Invalid request data passed", {status: 422})
        }

        return new Response("Could not load more posts", {status: 500})
    }

}