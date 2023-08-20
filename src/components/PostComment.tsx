"use client"
import { getAuthSession } from "@/lib/auth";
import { formatTimeToNow } from "@/lib/utils";
import { Avatar } from "@mui/material";
import { Comment, CommentVote, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { FC, useRef } from "react";


interface PostCommentProps {

    comment: ExtendedComment
}
//joined comment with votes/author in components\CommentSection.tsx so comment can be extended here
type ExtendedComment = Comment & {
    votes: CommentVote[]
    author: User
}
const PostComment = async ({ comment }: PostCommentProps) => {
    const commentRef = useRef<HTMLDivElement>(null)

      //fetching session client side since this is a client component
    //not ideal since increases load time slightly
    const { data: session } = useSession()
    const avatarStyle = {
        height: "1.5rem",
        width: "1.5rem"

    }
    return (
        //ref to see when clicking outside comment reply area
        //comment reply text area should disappear onClick somewhere else
        <div className="flex flex-col " ref={commentRef}>
            <div className="flex items-center">
                <Avatar src={session?.user.image?.toString()} sx = {avatarStyle} alt="default" />
                <div className="ml-2 flex items-center gap-x-2">
                    {/* who created the comment */}
                    <p className = "text-sm font-medium text-gray-900">u/{comment.author.username}</p>
                    {/* when comment was created */}
                    <p className="max-h-40 truncate text-xs text-zinc-500">
                            {formatTimeToNow(new Date(comment.createdAt))}
                    </p>
                </div>
            </div>
            {/*content of comment*/}
            <p className="text-sm text-zinc-900 mt-2 ">{comment.text}</p>

            
        </div>
    )
}

export default PostComment