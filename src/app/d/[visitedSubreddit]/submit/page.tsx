

//a component for creating posts on a subreddit

import Editor from "@/components/Editor"
import { Button } from "@/components/ui/Button"
import { db } from "@/lib/db"
import { notFound } from "next/navigation"

interface PageProps{
    params:{
        visitedSubreddit: string
    }

}




const Page = async({params}: PageProps) => {
    //get the current subreddit
    const subreddit = await db.subreddit.findFirst({
        where:{
            name: params.visitedSubreddit
        }
    })
    //throw notFound if it doesnt exist
    if(!subreddit){
        return notFound()

    }


    return (

        <div className = "flex flex-col items-start gap-6">
            <div className = "border-b border-gray-200 pb-5">
                <div className = "-ml-2 -mt-2 flex flex-wrap items-baseline">
                    <h3 className = "ml-2 mt-2 text-base font-semibold leading-6 text-gray-900">
                        Create Post
                    </h3>
                    <p className = "ml-2 mt-1 truncate text-md text-gray-500">in d/{params.visitedSubreddit}</p>
                </div>
            </div>

            <Editor subredditId = {subreddit.id}/>
            {/* button to submit whats in create post form  */}
            <div className = "w-full flex justify-end">
                {/* //any form in the app with an id of "subreddit-post-form" will use this button to submit it */}
                <Button type = "submit" className = "w-full" form = "subreddit-post-form">Post</Button>
            </div>
        </div>
    )

}

export default Page