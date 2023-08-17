"use client"

import useCustomToast from "@/hooks/use-custom-toast"
import { usePrevious } from "@mantine/hooks"

import { VoteType } from "@prisma/client"
import { FC, useEffect, useState } from "react"
import { Button } from "../ui/Button"
import { ArrowBigUp } from "lucide-react"
import { cn } from "@/lib/utils"


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
    //when a user votes reflected immediately as optimistic update
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


    return (
        <div className="flex sm:flex-col gap-4 sm:gap-0 pr-6 sm:w-20 pb-4 sm:pb-0">
            <Button size="sm" variant="ghost" aria-label="upvote">
                {/* function in lib/util to conditionally apply classNames */}
                <ArrowBigUp className={cn("h-5 w-5 text-zinc-700", { "text-emerald-500 fill-emerald-500": currentVote === "UP" })} />
            </Button>


        </div>
    )
}

export default PostVoteClient