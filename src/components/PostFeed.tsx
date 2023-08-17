"use client"
import { ExtendedPost } from "@/types/db"
import { FC, useRef } from "react"
import { useIntersection } from "@mantine/hooks"
import { useInfiniteQuery } from "@tanstack/react-query"
import { INFINITE_SCROLL_PAGINATION_RESULTS } from "@/config"
import axios from "axios"
import { useSession } from "next-auth/react"
import Post from "./Post"

interface PostFeedProps {
    //could be optional if post is on the main homepage and not a subreddit
    subredditName?: string,
    initialPosts: ExtendedPost[]

}

//getting posts initially, loading more posts as page loads
//props from d\[visitedSubreddit]\page.tsx
const PostFeed: FC<PostFeedProps> = ({ initialPosts, subredditName }) => {
    //DOM node reference to last post currently on screen
    const lastPostRef = useRef<HTMLElement>(null)

    //to get info about intersection of an element with its scroll container or body element
    //useIntersection docs: https://mantine.dev/hooks/use-intersection/
    //assigning post to ref, entry to check if currently intersecting
    const { ref, entry } = useIntersection({
        root: lastPostRef.current,
        threshold: 1
    })

    //fetching session client side since this is a client component
    //not ideal since increases load time slightly
    const { data: session } = useSession()

    //custom hook by tanstack
    //data is query result sent back from api endpoint(posts to show on screen)
    const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
        //query key required. query will automatically update when query key changes
        ["infinite-query"],
        //data fetching function required
        //recieves pageParam = initial page
        async ({ pageParam = 1 }) => {
            //define query to api endpoint to get more posts when bottom of page is reached
            //turning subredditName to boolean. if there is a subredditName append it to endpoint, if not append nothing
            const query = `api/posts?limit=${INFINITE_SCROLL_PAGINATION_RESULTS}&page=${pageParam}` +
                (!!subredditName ? `&subredditName=${subredditName}` : "")

            const { data } = await axios.get(query)
            return data as ExtendedPost[]
        }, {
        //handles logic of next pages
        getNextPageParam: (_, pages) => {
            return pages.length + 1
        },
        initialData: {
            pages: [initialPosts],
            pageParams: [1]
        }


    }

    )
    //determine posts to show
    //will be undefined at beginning before data has been fetched. so show initialPosts instead
    //?? checks for null/undefined only
    const posts = data?.pages.flatMap((page) => {
        return page
    }) ?? initialPosts


    return (
        <ul className="flex flex-col col-span-2 space-y-6 mt-6">
            {posts.map((post, index) => {
                //determine how many votes each post has
                //reduce needs a 0 for typescript to infer acc is type number
                const votesAmount = post.votes.reduce((acc, vote) => {
                    if (vote.type === "UP") {
                        return acc + 1
                    }
                    if (vote.type === "DOWN") {
                        return acc - 1
                    }
                    else {
                        return acc
                    }
                }, 0)

                //determine if user has already voted on post
                const currentVote = post.votes.find((vote) => {
                    vote.userId === session?.user.id
                })
                //if current post is the last post on screen
                if (index === posts.length - 1) {
                    //render a post with a ref attached
                    //if it intersects then load more posts
                    return (
                        //add ref to last post from useIntersection hook
                        <li key={post.id} ref={ref}>

                            <Post subredditName={post.subreddit.name} post = {post} commentAmt = {post.comments.length} />
                        </li>
                    )
                }
                //if post is not last on screen
                else {

                    return <Post subredditName={post.subreddit.name} post = {post} commentAmt = {post.comments.length} />
                }
            })}

        </ul>
    )
}

export default PostFeed