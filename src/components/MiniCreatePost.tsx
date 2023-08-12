"use client"

import Avatar from "@mui/material/Avatar"
import { Session } from "next-auth"
import { usePathname, useRouter } from "next/navigation"
import { FC } from "react"
import UserAvatar from "./UserAvatar"
import { Input } from "./ui/Input"
import { Button } from "./ui/Button"
import { ImageIcon, Link2 } from "lucide-react"

interface MiniCreatePostProps {
    //session is either type Session or null if user is not logged in
    session: Session | null


}
//recieving session as props
//fetching from server component d\[visitedSubreddit]\page.tsx instead of this client component
//because it is immediately available there with no loading state
const MiniCreatePost: FC<MiniCreatePostProps> = ({ session }) => {

    const router = useRouter()
    const pathname = usePathname()
    const avatarStyle = {
        height: "2rem",
        width: "2rem"

    }
    return (
        <li className="overflow-hidden rounded-md bg-white shadow">
            <div className="h-full px-6 py-4 flex justify-between gap-6">
                <div className="relative">
                    <Avatar src={session?.user.image?.toString()} sx={avatarStyle} alt="default" />
                    {/* <UserAvatar 
                    user = {{
                        name: session?.user.name || null,
                        image: session?.user.image || null
                    }}
                    /> */}

                    {/* rendering the green circle indicating online */}
                    <span className="absolute bottom-0 right-0 rounded-full w-3 h-3 bg-green-500 outline outline-2 outline-white" />

                </div>
                {/* A read only input field for submitting a post on a subreddit. naviagates to post creation page onClick similar to Reddit */}
                <Input readOnly
                    onClick={() => {
                        //concat the current path with /submit to submit a post on that subreddit
                        router.push(pathname + "/submit")
                    }}
                    placeholder="Create post"
                />
                {/* button for adding images to subreddit post */}
                <Button variant="ghost" onClick={() => {
                    router.push(pathname + "/submit")
                }} >
                    <ImageIcon className = "text-zinc-600"/>
                </Button>
                {/* button for adding a link to a subreddit post */}
                <Button variant="ghost" onClick={() => {
                    router.push(pathname + "/submit")
                }} >
                    <Link2 className = "text-zinc-600"/>
                </Button>

            </div>

        </li>
    )

}

export default MiniCreatePost