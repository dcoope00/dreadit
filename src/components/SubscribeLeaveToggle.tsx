"use client"
import { FC, startTransition } from "react"
import { Button } from "./ui/Button"
import { useMutation } from "@tanstack/react-query"
import { SubscribeToSubredditPayload } from "@/lib/validators/subreddit"
import axios, { AxiosError } from "axios"
import useCustomToast from "@/hooks/use-custom-toast"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
//a component for unsubscribing/subscribing to a subreddit
interface SubscribeLeaveToggleProps {
    subredditId: string
    subredditName: string
    isSubscribed: boolean
}

const SubscribeLeaveToggle: FC<SubscribeLeaveToggleProps> = ({ subredditId, subredditName, isSubscribed }) => {

    const { loginToast } = useCustomToast()
    const router = useRouter()
    const { mutate: subscribe, isLoading: isSubLoading } = useMutation({
        //mutationFn will submit data to api
        mutationFn: async () => {
            //defining type of the payload from lib\validators\subreddit.ts
            const payload: SubscribeToSubredditPayload = {
                subredditId,
            }
            //need a folder at api/subreddit/subscribe to create this url
            //will validate this payload in api/subreddit/subscribe/route.ts with zod validation
            const { data } = await axios.post("/api/subreddit/subscribe", payload)
            //since the api endpoint is mine, i know a string is returned
            return data as string
        },
        onError: (err) => {
            if (err instanceof AxiosError) {
                //error 401 unathorized
                if (err.response?.status === 401) {
                    return loginToast()
                }

            }
            //for any other error
            return toast({
                title: "An error has occured",
                description: "Cannot perform action",
                variant: "destructive"
            })


        },
        onSuccess: () => {
            //used to update the state without blocking the UI
            //allows for reloading without any state changes
            //documentation for startTransition:https://react.dev/reference/react/startTransition
            startTransition(() => {
                router.refresh()
            })
            return toast({
                title: "Subscribed successfully",
                description: `You are now subscribed to d/${subredditName}`,
                variant:"success"
            })
        }

    })

    const { mutate: unsubscribe, isLoading: isUnsubLoading } = useMutation({
        //mutationFn will submit data to api
        mutationFn: async () => {
            //defining type of the payload from lib\validators\subreddit.ts
            //althoug the validator is "SubscribeToSubredditPayload" the payload is still the same so a different validator is not necessary
            const payload: SubscribeToSubredditPayload = {
                subredditId,
            }
            //need a folder at api/subreddit/subscribe to create this url
            //will validate this payload in api/subreddit/subscribe/route.ts with zod validation
            const { data } = await axios.post("/api/subreddit/unsubscribe", payload)
            //since the api endpoint is mine, i know a string is returned
            return data as string
        },
        onError: (err) => {
            if (err instanceof AxiosError) {
                //error 401 unathorized
                if (err.response?.status === 401) {
                    return loginToast()
                }

            }
            //for any other error
            return toast({
                title: "An error has occured",
                description: "Cannot perform action",
                variant: "destructive"
            })


        },
        onSuccess: () => {
            //used to update the state without blocking the UI
            //allows for reloading without any state changes
            //documentation for startTransition:https://react.dev/reference/react/startTransition
            startTransition(() => {
                router.refresh()
            })
            return toast({
                title: "Unsubscribed successfully",
                description: `You are now unsubscribed from d/${subredditName}`,
                variant:"success"
            })
        }

    })
    return (
        isSubscribed ? (
            <Button className="w-full mt-1 mb-4"
                onClick={() => {
                    unsubscribe()
                }}
                isLoading = {isUnsubLoading}
            >Leave Community</Button>
        ) : (
            <Button
                className="w-full mt-1 mb-4"
                onClick={() => {
                    subscribe()
                }}
                isLoading={isSubLoading}>Join To Post</Button>
        )
    )
}

export default SubscribeLeaveToggle