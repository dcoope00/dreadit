import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config"
import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import PostFeed from "./PostFeed"
import { notFound } from "next/navigation"



const CustomFeed = async () => {


    const session = await getAuthSession()

    //if nobody is logged in do nothing
    if (!session) {
        return notFound()
    }
    //getting subreddits user is following
    const followedSubreddits = await db.subscription.findMany({
        where: {
            userId: session?.user.id
        },
        include: {
            subreddit: true
        }
    })
    //checking if user is logged in


    const posts = await db.post.findMany({
        orderBy: {
            createdAt: "desc",
        },
        where: {
            subreddit: {
                name: {
                    in: followedSubreddits.map(({ subreddit }) => {
                        return subreddit.id
                    })
                }
            }
        },
        include: {
            author: true,
            subreddit: true,
            comments: true,
            votes: true
        },
        take: INFINITE_SCROLL_PAGINATION_RESULTS


    })

    return (
        <PostFeed initialPosts={posts} />
    )
}

export default CustomFeed