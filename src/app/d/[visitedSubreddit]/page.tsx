import MiniCreatePost from "@/components/MiniCreatePost"
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config"
import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { notFound } from "next/navigation"
import PostFeed from "../../../components/PostFeed"

interface PageProps {
    //getting passed d/"visitedSubreddit" as an object
    params: {
        visitedSubreddit: string
    }
}
///[folderName] is a required name for dynamic segments
//catch-all component to fetch subreddit user has just visited

const page = async ({ params }: PageProps) => {
    //destructuring the visitedSubreddits from the props and use it for data fetching
    const { visitedSubreddit } = params
    //getting current session 
    const session = await getAuthSession()

    //getting subreddit user has visited
    const subreddit = await db.subreddit.findFirst({
      where: { name: visitedSubreddit },
      include: {
        posts: {
          //joining Post and Subreddit tables
          include: {
            author: true,
            votes: true,
            comments: true,
            subreddit: true,
          },
          take: INFINITE_SCROLL_PAGINATION_RESULTS,
        },
      },
    })
    //if subreddit does not exist throw error
    if (!subreddit) return notFound()
    

    return (
        <>
            <h1 className = "font-bold text-3xl md:text-4xl h-14">d/{subreddit.name}</h1>
            {/* the read-only input field/add image to subreddit post button/add link to subreddit post button in a reddit-style layout*/}
            <MiniCreatePost session = {session}/>
            {/* show posts in user feed*/}
            <PostFeed initialPosts = {subreddit.posts} subredditName={subreddit.name}  />
            
        </>

    )
}
export default page
