import { db } from "@/lib/db"



export async function GET(req: Request) {

    const url = new URL(req.url)

    const q = url.searchParams.get("q")
    //if there is no query 
    if (!q) {
        return new Response("Invalid query", { status: 400 })
    }
    //find a list of subreddits that match the user search input
    const results = await db.subreddit.findMany({
        where:{
            //ex. "rea" would lead to "reactjs"
            name: {
                startsWith: q
            }
        },
        //created in components\SearchBar.tsx
        //includes the number of posts, number of subscribers for a subreddit
        include:{
            _count: true
        },
       
    })
    return new Response(JSON.stringify(results))

}