import { Post, Vote, VoteType } from "@prisma/client"
import { getServerSession } from "next-auth"
import { notFound } from "next/navigation"
import PostVoteClient from "./PostVoteClient"



interface PostVoteServerProps {
    postId: string,
    initialVotesAmt?: number,
    initialVote?: VoteType | null,
    //extending pos with Vote
    getData?: () => Promise<(Post & { votes: Vote[] }) | null>

}


const PostVoteServer = async ({ postId, initialVotesAmt, initialVote, getData }: PostVoteServerProps) => {

    //always pass postId,
    //pass either initialVotesAmt & initialVote OR getData to execute here to retrieve data
    //makes it easy to use suspense to display loading state
    //hybrid approach

    const session = await getServerSession()

    let _votesAmt: number = 0
    let _currentVote: VoteType | null | undefined = undefined
    //data is loaded after page is rendered, instead of waiting for data to finish loading to render page
    //gives a better user experience
    if (getData) {
        const post = await getData()
        if (!post) {
            return notFound()
        }
        _votesAmt = post.votes.reduce((acc, vote) => {
            if (vote.type === "UP") {
                return acc + 1
            }
            if (vote.type === "DOWN") {
                return acc - 1
            }
            return acc
        }, 0)
        //_currentVote is type VoteType so only take type
        _currentVote = post.votes.find((vote) => vote.userId === session?.user.id)?.type
    } else {
        //passed initialVote, initialVotesAmt instead of getData
        //! telling TS it does exist since it will be passed if getData is not
        _votesAmt = initialVotesAmt!
        _currentVote = initialVote
    }





    return (
        <PostVoteClient
            postId={postId}
            initialVotesAmt={_votesAmt}
            initialVote={_currentVote} />
    )
}

export default PostVoteServer