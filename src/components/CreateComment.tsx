"use client"
import { useState } from "react"
import { Label } from "./ui/Label"
import { Textarea } from "./ui/Textarea"
import { Button } from "./ui/Button"
import { useMutation } from "@tanstack/react-query"
import { CommentRequest } from "@/lib/validators/comment"
import axios, { AxiosError } from "axios"
import useCustomToast from "@/hooks/use-custom-toast"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"




interface CreateCommentProps {
    postId: string,
    //optional since not every comment is a reply
    replyToId?: string


}

//component to write a comment
const CreateComment = ({ postId, replyToId }: CreateCommentProps) => {
    const [input, setInput] = useState<string>("")
    const router = useRouter()

    //handling logic for posting comment
    const { mutate: postComment, isLoading } = useMutation({

        mutationFn: async ({ postId, text, replyToId }: CommentRequest) => {
            const payload: CommentRequest = {
                postId,
                text,
                replyToId
            }
            //the api endpoint file path
            const { data } = await axios.patch(`/api/subreddit/post/comment`, payload)
            return data

        },
        onError: (err) => {
            //handling fetching errors
            if (err instanceof AxiosError) {

                if (err.response?.status === 401) {
                    //if user is not logged in, display custom unauthorized toast
                    const toast = useCustomToast()
                    return (
                        toast.loginToast()
                    )
                }
            }
            toast({
                title: "An error occured",
                description: "Could not publish comment.",
                variant: "destructive"

            })

        },
        onSuccess: () => {
            //refresh the browser if successful to show most fresh comments
            router.refresh()
            setInput("")
        }


    })

    return (

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

                <div className="mt-2 flex justify-end">
                    <Button
                        isLoading={isLoading}
                        disabled={input.length === 0}
                        onClick={() =>postComment({postId, text: input, replyToId}) }
                    >Post</Button>
            </div>
        </div>

        </div >
    )
}

export default CreateComment