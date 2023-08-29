"use client"
import { getAuthSession } from "@/lib/auth";
import { formatTimeToNow } from "@/lib/utils";
import  Avatar  from "@mui/material/Avatar";
import { Comment, CommentVote, User, VoteType } from "@prisma/client";
import { useSession } from "next-auth/react";
import { FC, useRef, useState } from "react";
import CommentVotes from "./CommentVotes";
import { Button } from "./ui/Button";
import { MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { Label } from "./ui/Label";
import { Textarea } from "./ui/Textarea";
import { useMutation } from "@tanstack/react-query";
import { CommentRequest } from "@/lib/validators/comment";
import axios from "axios";
import { toast } from "@/hooks/use-toast";


interface PostCommentProps {

    comment: ExtendedComment
    votesAmt: number
    //currentVote is type CommentVote from prisma or undefined if user has not voted for a comment
    currentVote: CommentVote | undefined
    postId: string
}


//joined comment with votes/author in components\CommentSection.tsx so comment can be extended here
type ExtendedComment = Comment & {
    votes: CommentVote[]
    author: User
}
const PostComment = ({ comment, votesAmt, currentVote, postId }: PostCommentProps) => {
    const commentRef = useRef<HTMLDivElement>(null)
    const router = useRouter()
    //fetching session client side since this is a client component
    //not ideal since increases load time slightly
    const { data: session } = useSession()
    const [isReplying, setIsReplying] = useState<boolean>(false)
    const [input, setInput] = useState<string>(`@${comment.author.username}`)

    const { mutate: postCommentReply, isLoading } = useMutation({
        mutationFn: async ({ postId, text, replyToId }: CommentRequest) => {
            const payload: CommentRequest = {
                postId, text, replyToId
            }
            //using same endpoint as CreateComment. Only replyToId needs to be changed
            //creating comments and replying to comments use same api logic
            const { data } = await axios.patch("/api/subreddit/post/comment", payload)
            return data

        },

        onError: () => {
            return toast({
                title: "Something went wrong",
                description: "Could not publish reply",
                variant: "destructive"
            })
        },
        onSuccess: () => {
            router.refresh()
            setIsReplying(false)
        },

    })

    const avatarStyle = {
        height: "1.5rem",
        width: "1.5rem"

    }
    return (
        //ref to see when clicking outside comment reply area
        //comment reply text area should disappear onClick somewhere else
        <div className="flex flex-col " ref={commentRef}>
            <div className="flex items-center">
                <Avatar src={session?.user.image?.toString()} sx={avatarStyle} alt="default" />
                <div className="ml-2 flex items-center gap-x-2">
                    {/* who created the comment */}
                    <p className="text-sm font-medium text-gray-900">u/{comment.author.username}</p>
                    {/* when comment was created */}
                    <p className="max-h-40 truncate text-xs text-zinc-500">
                        {formatTimeToNow(new Date(comment.createdAt))}
                    </p>
                </div>
            </div>
            {/*content of comment*/}
            <p className="text-sm text-zinc-900 mt-2 ">{comment.text}</p>

            <div className="flex gap-2 items-center flex-wrap">
                <CommentVotes
                   commentId={comment.id}
                   votesAmt={votesAmt}
                   currentVote={currentVote}
                />
                {/* reply button for top level comments */}
                <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => {
                        //if user isnt signed in forward to sign in page
                        if (!session) {
                            return router.push("/sign-in")
                        }
                        //keep tracking of whether user is replying or not
                        setIsReplying(true)
                    }}
                ><MessageSquare className=" h-4 w-4 mr-1.5" />Reply</Button>

                {isReplying ? (

                    <div className="grid w-full gap-1.5">
                        <Label htmlFor="comment">Your comment</Label>
                        <div className="mt-2 ">
                            {/* id is the htmlFor of the label */}
                            <Textarea
                                id="comment"
                                value={input}
                                onChange={(event) => {
                                    return (
                                        setInput(event.target.value)
                                    )
                                }}
                                rows={1}
                                placeholder="What are your thoughts?"
                            />

                            <div className="mt-2 flex justify-end gap-2">
                                <Button

                                    //hitting tab will focus post button instead of cancel
                                    tabIndex={-1}
                                    variant="subtle"
                                    onClick={() => {
                                        setIsReplying(false)
                                    }}

                                >Cancel
                                </Button>
                                <Button
                                    isLoading={isLoading}
                                    disabled={input.length === 0}
                                    onClick={() => {
                                        //check comment reply is not empty
                                        if (!input) {
                                            return
                                        }
                                        postCommentReply({
                                            postId,
                                            text: input,
                                            replyToId: comment.replyToId ?? comment.id
                                        })

                                    }}
                                >Post</Button>
                            </div>
                        </div>

                    </div >

                ) : null}
            </div>


        </div>
    )
}

export default PostComment