


import CommentSection from "@/components/CommentSection"
import EditorOutput from "@/components/EditorOutput"
import PostVoteServer from "@/components/post-vote/PostVoteServer"
import { buttonVariants } from "@/components/ui/Button"
import { db } from "@/lib/db"
import { redis } from "@/lib/redis"
import { formatTimeToNow } from "@/lib/utils"
import { CachedPost } from "@/types/redis"
import { Post, User, Vote } from "@prisma/client"
import { ArrowBigDown, ArrowBigUp, Loader2 } from "lucide-react"
import { notFound } from "next/navigation"
import { Suspense } from "react"

//[postId] is a dynamic route used for post detail pages

interface PageProps {
    //params must have postId since that is the name of the slug folder
    params: {
        //postId is name of slug folder
        postId: string,

    }
}

//route-segment-confg docs: https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
//force-dynamic is equivalent to getServerSideProps
//disables all caching of fetch requests and always revalidates.
export const dynamic = "force-dynamic"
//when a post detail page is visited, hard reload associated info so new comments are shown accurately
export const fetchCache = "force-no-store"
const page = async ({ params }: PageProps) => {
    //getting all properties from cache
    //CachedPost type is enforced on payload
    const cachedPost = (await redis.hgetall(`post:${params.postId}`)) as CachedPost
    //joining tables. 
    let post: ((Post & {votes: Vote[]; author: User})) | null = null

    //if no cached posts use database for necessary info
    if(!cachedPost){
        post = await db.post.findFirst({
            where:{
                id: params.postId,

            },
            include:{
                votes: true,
                author: true
            }
        })
    }
    if(!post && !cachedPost){
        return notFound()
    }



    return (
        <div >
            <div className="h-full flex flex-col sm:flex-row items-center sm:items-start justify-between">
            {/* Suspense displays a fallback until its children have finished loading
            in this case it will display a loading state until getData has finished executing*/}
            <Suspense fallback = {<PostVoteShell/>}>
                {/*@ts-expect-error server component*/}
                <PostVoteServer postId = {post?.id ?? cachedPost.id } getData = {async () => {
                    return await db.post.findUnique({
                        where:{
                            id: params.postId
                        },
                        include:{
                            votes: true
                        }
                    })
                }}/>
            </Suspense>
                {/* rendering post content */}
                <div className="sm:w-0 w-full flex-1 bg-white p-4 rounded-sm">
                    <p className = "max-h-40 mt-1 truncate text-xs text-gray-500">
                        Posted by u/{post?.author.username ?? cachedPost.authorUsername} {" "}
                        {formatTimeToNow(new Date(post?.createdAt ?? cachedPost.createdAt))}
                    </p>
                    <h1 className = "text-xl font-semibold py-2 leading-6 text-gray-900">
                        {post?.title ?? cachedPost.title}
                    </h1>

                    <EditorOutput content = {post?.content ?? cachedPost.content}/>

                    {/* streaming in comments instead of server-side-loading which would require all comments to be loaded
                    for page to render. would lessen user experience*/}
                    <Suspense fallback = {<Loader2 className = "h-5 w-5 animate-spin text-zinc-500"/>}>
                        {/* rendering comment section */}
                        {/*@ts-expect-error server component*/}
                        <CommentSection postId = {post?.id ?? cachedPost.id}/>

                    </Suspense>

                </div>

            </div>
        </div>
    )
}

//will only be used here so its in the same component
//make it resemble the PostVoteClient without interactivity since it is the loading state
function PostVoteShell(){

    return (
        <div className="flex items-center flex-col pr-6 w-20">
            <div className={buttonVariants({variant: "ghost"})}>
                <ArrowBigUp className = "h-5 w-5 text-zinc-700"/>
            </div>
            {/* would render the vote score but it is unknown when this is rendered so display a loading spinner */}
            <div className="text-center py-2 font-md text-sm text-zinc-900">
            <Loader2 className="h-3 w-3 animate-spin"/>
            </div>

            <div className={buttonVariants({variant: "ghost"})}>
                <ArrowBigDown className = "h-5 w-5 text-zinc-700"/>
            </div>
        </div>
    )

}
export default page