"use client"

import useCustomToast from "@/hooks/use-custom-toast"
import { usePrevious } from "@mantine/hooks"

import { VoteType } from "@prisma/client"
import { FC, useEffect, useState } from "react"
import { Button } from "../ui/Button"
import { ArrowBigDown, ArrowBigUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { useMutation } from "@tanstack/react-query"
import { PostVoteRequest } from "@/lib/validators/vote"
import axios, { AxiosError } from "axios"
import { toast } from "@/hooks/use-toast"


interface PostVoteClientProps {
    postId: string,
    initialVotesAmt: number,
    initialVote?: VoteType | null


}

const PostVoteClient: FC<PostVoteClientProps> = ({ postId, initialVotesAmt, initialVote }) => {
    //display if user tries to vote without being logged in
    const { loginToast } = useCustomToast()
    //when a user up or down votes will be updated immmediately via state change
    const [votesAmt, setVotesAmt] = useState<number>(initialVotesAmt)
    //when a user votes reflected immediately as optimistic update. reflected as color of arrow(red/green)
    const [currentVote, setCurrentVote] = useState(initialVote)
    //if anything goes wrong with up/down voting, revert to previous vote
    //could also be done with a ref
    const prevVote = usePrevious(currentVote)

    //ensure synchronization with server
    useEffect(() => {
        //initial vote could be undefined intially and later populated. would desync client/server
        //so setCurrentVote whenever initialVote changes
        setCurrentVote(initialVote)

    }, [initialVote])

    //creating a Vote from prisma model
    const { mutate: vote } = useMutation({
        //recieving type of vote: "UP" or "DOWN"
        mutationFn: async (voteType: VoteType) => {
            //using zod validator in validators\vote.ts
            const payload: PostVoteRequest = {
                postId,
                voteType
            }
            //patch updates 
            const data = await axios.patch("/api/subreddit/post/vote", payload)

        },
        onError: (err, voteType) => {
            if (voteType === "UP") {
                setVotesAmt((prevAmt) => {
                    return prevAmt-1
                })
            }
            else{
                setVotesAmt((prevAmt) => {
                    return prevAmt+1
                })
            }
            //reset current vote
            setCurrentVote(prevVote)
            if(err instanceof AxiosError){
                //unauthorized error
                if(err.response?.status === 401){
                    return loginToast()
                }
                return toast({
                    title: "Something went wrong",
                    description: "Your vote was not registered",
                    variant: "destructive"
                })
            }
            

        },
        //called as soon as action happens. optimistic updates
        //type is the direction the user is trying to vote in
        //currentVote is what the user has currently voted
        onMutate: (type: VoteType) => {
            //if user is attempting double voting, remove vote
            if(currentVote === type){
                setCurrentVote(undefined)
                if(type === "UP"){
                    setVotesAmt((prev) => {
                        return prev-1
                    })
                }
               else if(type === "DOWN"){
                    setVotesAmt((prev) => {
                        return prev+1
                    })
                }
            }
            //if user is not trying to double vote
            else{
                //set the current vote to type being emitted by user
                setCurrentVote(type)
                //if user is changing from down-vote to up-vote
                if(type === "UP"){
                    setVotesAmt((prev) => {
                        //if user has previously voted on post, edit amount by 2, else edit by 1
                        return prev+(currentVote ? 2 : 1)
                    }) 
                }
                else if (type === "DOWN"){
                    setVotesAmt((prev) => {
                        return prev - (currentVote ? 2 : 1)
                    })
                }

            }


        },

        onSuccess: () => {

        }

    })


    return (
        <div className="flex sm:flex-col gap-4 sm:gap-0 pr-6 sm:w-20 pb-4 sm:pb-0">
            <Button
                size="sm"
                variant="ghost"
                aria-label="upvote"
                onClick={() => {
                    vote("UP")
                }}>
                {/* function in lib/util to conditionally apply classNames */}
                <ArrowBigUp className={cn("h-5 w-5 text-zinc-700", { "text-emerald-500 fill-emerald-500": currentVote === "UP" })} />
            </Button>

            <p className="text-center py-2 font-md text-sm text-zinc-900">{votesAmt}</p>
            <Button
                size="sm"
                variant="ghost"
                aria-label="downvote"
                onClick={() => {
                    vote("DOWN")
                }}>
                {/* function in lib/util to conditionally apply classNames */}
                <ArrowBigDown className={cn("h-5 w-5 text-zinc-700", { "text-red-500 fill-red-500": currentVote === "DOWN" })} />
            </Button>
        </div>
    )
}

export default PostVoteClient