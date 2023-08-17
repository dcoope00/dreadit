

//a wrapper component around all page contents below or same level as [visitedSubreddit] folder
// layout is a reserved nextjs file name and is automatically passed children of type React.ReactNode

import SubscribeLeaveToggle from "@/components/SubscribeLeaveToggle"
import { Button, buttonVariants } from "@/components/ui/Button"
import { getAuthSession } from "@/lib/auth"
import { db } from "@/lib/db"
import { format } from "date-fns"
import Link from "next/link"
import { notFound } from "next/navigation"

//this component allows styling of every subreddit
const Layout = async ({
    children,
    //layout can also accept the params VisitedSubreddit since it is in the same folder
    params: { visitedSubreddit },
}: {
    children: React.ReactNode,
    params: { visitedSubreddit: string }
}) => {


    const session = await getAuthSession()

    const subreddit = await db.subreddit.findFirst({
        where: {
            name: visitedSubreddit
        },
        include: {
            posts: {
                include: {
                    author: true,
                    votes: true
                }
            }
        }
    })
    //if there is no session.user, nobody is logged in so no db fetch is required
    //if there is a session user, try to fetch their subscription
    const subscription = !session?.user ? undefined : await db.subscription.findFirst({
        where: {
            subreddit: {
                name: visitedSubreddit
            },
            user: {
                id: session.user.id
            }
        }
    })
    //turning subscription into a boolean with !!
    const isSubscribed = !!subscription


    if (!subreddit) return notFound()

    //determine how many members are in the subeddit

    const memberCount = await db.subscription.count({
        where: {
            subreddit: {
                name: visitedSubreddit
            }
        }
    })


    return (
        <div className="sm:container max-w-7xl mx-auto h-full pt-12">
            <div>

                {/* Button to take us back */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6">
                    <div className="flex flex-col col-span-2 sapce-y-6">
                        {children}
                    </div>
                    {/* info sidebar */}
                    <div className="hidden md:block bg-violet-900 overflow-hidden h-fit rounded-lg border border-gray-200 order-first md:order-last">
                        <div className="px-6 py-4">
                            <p className="font-semibold py-3 text-white">
                                About d/{subreddit.name}
                            </p>
                        </div>

                        <dl className="divide-y divide-gray-100 px-6 py-4 text-sm leading-6 bg-white">
                            <div className="flex justify-between gap-x-4 py-3">
                                <dt className="text-gray-500">Created</dt>
                                <dd className="text-gray-700">
                                    <time dateTime={subreddit.createdAt.toDateString()}>
                                        {format(subreddit.createdAt, "MMMM d, yyyy")}
                                    </time>
                                </dd>
                            </div>
                            <div className="flex justify-between gap-x-4 y-3">
                                <dt className="text-gray-500">Members</dt>
                                <dd className="text-gray-700">
                                    <div className="text-gray-900">{memberCount}</div>
                                </dd>
                            </div>
                            {/* if the user logged in is the creator of the subreddit display this */}
                            {subreddit.creatorId === session?.user.id ? (
                                <div className="flex justify-between gap-x-4 py-3">
                                    <p className="text-gray-500">You created this community</p>
                                </div>
                            ) : null}
                            {subreddit.creatorId === session?.user.id ? null : (
                                <SubscribeLeaveToggle
                                    isSubscribed={isSubscribed}
                                    subredditId={subreddit.id}
                                    subredditName={subreddit.name} />
                            )}
                            {session?.user ? 
                            <Link
                                href={`d/${visitedSubreddit}/submit`}
                                className={buttonVariants({
                                    variant: "outline",
                                    className: "w-full mb-6"
                                })}>Create Post</Link> : null} 
                        </dl>

                    </div>
                </div>

            </div>
        </div >
    )


}

export default Layout