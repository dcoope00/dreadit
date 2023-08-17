import { formatTimeToNow } from "@/lib/utils";
import { Post, User, Vote } from "@prisma/client";
import { MessageSquare } from "lucide-react";
import { FC, useRef } from "react";
import EditorOutput from "./EditorOutput";


interface PostProps {

    subredditName: string
    //extending the Post prisma model to include the author and votes
    post: Post & {
        author: User,
        votes: Vote[]
        
    }
    commentAmt: number


}

//a component to preview each post. onClick will fetch data for the post and navigate to its page
const Post: FC<PostProps> = ({ subredditName, post, commentAmt}) => {
    //dynamically track height of post
    const pRef = useRef<HTMLDivElement>(null)

    
    return (
        <div className="rounded-md bg-white shadow">
            <div className="px-6 py-4 flex justify-between">
                {/* display current votes */}

                <div className="w-0 flex-1">
                    <div className="max-h-40 mt-1 text-xs text-gray-500">
                        {subredditName ? (
                            <>
                                {/* using an a tag instead of Link so it will hard refresh onClick */}
                                <a href={`/d/${subredditName}`}
                                    className="underline text-zinc-900 text-sm underline-offset-2">
                                    d/{subredditName}
                                </a>
                                <span className="px-1">•</span>

                            </>) : null}
                        <span className="">Posted by u/{post.author.name}</span>{` `}
                        {/* a function in /lib/utils to calculate how much time as passed since post was created */}

                        {formatTimeToNow(post.createdAt)}


                    </div>
                    {/* using an a tag to hard refresh onClick to the post detail page so comments will be fetched again */}
                    <a href={`/d/${subredditName}/post/${post.id}`} >
                        <h1 className="text-lg font-semibold py-2 leading-6 text-gray-900">{post.title}</h1>
                    </a>
                    {/* attaching ref to check client side if post is at max height(longer than is being displayed in preview) */}
                    <div className="relative text-sm max-h-40 w-full overflow-clip" ref={pRef} >
                            {/* render output of editor as preview */}
                        <EditorOutput content={post.content}/>
                        {/* if post preview is more than 160px show blur */}
                        {pRef.current?.clientHeight === 160 ? (
                            //rendering a blur
                            <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-white to-transparent" />
                        ) : null}
                    </div>
                </div>
            </div>
            {/* how many comments there are on a post */}
            <div className="bg-gray-50 z-20 text-sm p-4 sm:px-6">
                <a href={`/d/${subredditName}/post/${post.id}`} className="w-fit flex items-center gap-2">
                            {/* icon from lucid react */}
                            <MessageSquare className = "h-4 w-4"/>{commentAmt} comments
                </a>
            </div>

        </div>
    )
}

export default Post

