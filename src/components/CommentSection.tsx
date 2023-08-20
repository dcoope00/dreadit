import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import PostComment from "./PostComment"
import CreateComment from "./CreateComment"


interface CommentSectionProps{

    postId: string
}


//for simplicity, for now will only implement reply comments on the top comment, no replies to replies
const CommentSection = async ({postId}: CommentSectionProps) =>{

    const session = await getAuthSession()

    const comments = await db.comment.findMany({
        where:{
            postId,
            //only fetching top comments 
            replyToId: null
        },
        include:{
            author: true,
            votes: true,
            //fetching replies to top comments
            replies: {
                include:{
                    author: true,
                    votes: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    return (
        <div className="flex flex-col gap-y-4 mt-4">
            {/* horizontal line */}
            <hr className = "w-full h-px my-6"/>

            <CreateComment postId = {postId}/>

            <div className="flex flex-col gap-y-6 mt-4">
                {/* finding the top level comments */}
                {comments.filter((comment) => !comment.replyToId).map((topComment) => {
                    //determine how many votes each top comment has
                    const voteAmt = topComment.votes.reduce((acc, vote) => {
                        if(vote.type === "UP"){
                            return acc+1
                        }
                        if(vote.type === "DOWN"){
                            return acc-1
                        }
                        return acc
                    }, 0)
                    
                    const topCommentVote = topComment.votes.find((vote) => vote.userId === session?.user.id)
                        //filter return 
                        return (
                            //div needs a key since it is in a map
                                <div key = {topComment.id} className="flex flex-col ">
                                    <div className="mb-2">
                                        {/*@ts-expect-error server component */}
                                        <PostComment comment = {topComment}/>
                                    </div>

                                </div>
                        )
                })}
            </div>
        </div>
    )
}

export default CommentSection