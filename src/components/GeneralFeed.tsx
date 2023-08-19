import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config"
import { db } from "@/lib/db"
import PostFeed from "./PostFeed"


//showing a feed to anyone not logged in
const GeneralFeed = async () => {

    const posts = await db.post.findMany({
        orderBy:{
            createdAt: "desc",
        },
        //joining 4 tables 
        include:{
            votes: true,
            author: true,
            comments: true,
            subreddit: true
        },
        take: INFINITE_SCROLL_PAGINATION_RESULTS,

    })

    return (
        <PostFeed initialPosts = {posts}/>
    )
}

export default GeneralFeed