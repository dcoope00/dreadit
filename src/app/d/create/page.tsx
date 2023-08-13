"use client"

import { Button, buttonVariants } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { useRouter } from "next/navigation"
import { useState } from "react"
import {useMutation} from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { CreateSubredditPayload } from "@/lib/validators/subreddit"
import { toast } from "@/hooks/use-toast"

import useCustomToast from "@/hooks/use-custom-toast"

//this url will contain r/create according to NextJS app routing naming conventions
//page.tsx name is enforced as with all files for app routing

//this component will dictate what happens when navigating to d/create

const Page = () => {


    const [input, setInput] = useState("")
    const router = useRouter()
    //react-query depends on a context
    //documentation for useMutation is at https://tanstack.com/query/v4/docs/react/reference/useMutation
    //mutate is called to execute mutationFn
    //useMutation can be destructured to many things found in the docs

    const {mutate: createCommunity, isLoading} = useMutation({
        //mutation function handles data fetching. returns promise
        mutationFn: async () => {
            //enforcing type safety on payload from zod validators file /lib/validators/subreddit
            const payload: CreateSubredditPayload= {
                name: input
            }

            //data is answer from server which is subreddit name. 
            //Returned the subreddit name as a response in api\subreddit\route.ts to easily navigate to the newly created subreddit on creation
            const {data} = await axios.post("/api/subreddit", payload)
             //data is answer from server. casting to string because string is returned as successful response
            return data as string

        },
        onError: (err) => {
            //handling fetching errors
            if(err instanceof AxiosError) {
                if(err.response?.status === 409){
                    return toast({
                        title: "Subreddit already exists.",
                        description: "Please choose a different subreddit name.",
                        variant: "destructive"

                    })
                }
                if(err.response?.status === 422){
                    return toast({
                        title: "Invalid subreddit name.",
                        description: "Subreddit name must be between 3 and 21 characters.",
                        variant: "destructive"

                    })
                }

                if(err.response?.status === 401){
                    //if user is not logged in, display custom unauthorized toast
                   const toast = useCustomToast()
                   return (
                    toast.loginToast()
                   )
                }
            }
            toast({
                title: "An error occured",
                description: "Could not create subreddit",
                variant: "destructive"

            })

        },
        //navigating to the newly created subreddit.
        //data is the response from successful fetch which returns the subreddit name
        onSuccess: (data) => {
            router.push(`/r/${data}`)
        }

    })

    return (
        <div className="container flex items-center h-full max-w-3xl mx-auto">
            <div className="relative bg-white w-full h-fit p-4 rounded-lg space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl font-semibold">Create a community</h1>
                </div>

                <hr className="bg-zinc-500 h-px"></hr>

                <div >
                    <p className="text-lg font-medium">Name</p>
                    <p className="text-zinc-500 text-xs pb-2">Community names including capitalizaton cannot be changed.</p>

                    <div className="relative">
                        <p className="absolute text-sm left-0 w-8 inset-y-0 grid place-items-center text-zinc-400">d/</p>
                        <Input
                            value={input}
                            onChange={(e) => { setInput(e.target.value) }}
                            className="pl-6" />

                    </div>

                    <div className="-my-3 divide-y divide-gray-100 py-4 text-sm leading-6">
                        <div className="flex justify-end gap-x-4 py-3 pr-5 bg-zinc-100">
                        <Button variant = {"outline"} onClick = {() => {router.back()}}>Cancel</Button>
                        {/* isLoading comes from destructured useMutation hook
                        button should be disabled if the length of input is 0 */}
                        <Button 
                        isLoading = {isLoading} 
                        disabled = {input.length === 0}
                        onClick = {() => {createCommunity()}}>Create Community</Button>
                        </div>

                    </div>
                </div>


            </div>

        </div>


    )
}

export default Page