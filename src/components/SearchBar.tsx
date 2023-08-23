"use client"
import { FC, useCallback, useEffect, useRef, useState } from "react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandList } from "./ui/Command"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Prisma, Subreddit } from "@prisma/client"
import { CommandItem } from "cmdk"
import { usePathname, useRouter } from "next/navigation"
import { Users } from "lucide-react"
import debounce from "lodash.debounce"
import { useOnClickOutside } from "@/hooks/use-on-click-outside"


interface SearchBarProps {}


const SearchBar: FC<SearchBarProps> = ({ }) => {
    const [input, setInput] = useState<string>("")
    const router = useRouter()
    const commandRef = useRef<HTMLDivElement>(null)
    const pathname = usePathname()

    //since only a GET request for search results is need, no need for useMutation
    const { data: queryResults, refetch, isFetched, isFetching } = useQuery({

        //queryKey can be anything
        queryKey: ["search-query"],
        queryFn: async () => {
            //return empty array of communities if there is no input 
            if (!input) return []
            //passing query param with ?. q= (query =)
            //the response from the endpoint will be JSON and saved as queryResults
            const { data } = await axios.get(`/api/search?q=${input}`)
            //casting type of data as Subreddit prisma model extended by

            return data as (Subreddit & {
                //_count is the number of posts and number of subscribers to display to the user
                _count: Prisma.SubredditCountOutputType
                //empty brackets cast data to an array
            })[]
        },
        //only want to fetch when needed not right away
        enabled: false
    })

    //debouncing the api request for the search bar since it is called onChange to reduce the amount of api calls
    //api call will only run after stop typing for 300 milliseconds
    const request = debounce( async() => {
        refetch()
    }, 300)
    //useCallback maintains integrity throughout re-renders. used here to prevent debounce being triggered multiple times
    //debounce when user hasnt typed for certain time. optimizes performance to not spam db every keystroke
    const debounceRequest = useCallback(() => {
        request()
    }, [])

    //docs for this hook: https://usehooks-ts.com/react-hook/use-on-click-outside
    useOnClickOutside(commandRef, () => {
        setInput("")
    })

    useEffect(() => {
        setInput("")

    }, [pathname])
    return (
        //shadcn component for a search bar/command menu
        //hover over any Command components to see options available for it
        //commandRef will close the search results onClick outside the input component
        <Command ref = {commandRef} className="relative rounded-lg border max-w-lg z-50 overflow-visible">
            {/* passing value to CommandInput makes it a controlled component */}
            <CommandInput
                value={input}
                onValueChange={(text) => {
                    setInput(text)
                    debounceRequest()

                }}
                className="outline-none border-none focus:border-none focus:outline-none ring-0"
                placeholder="Search communities..." />
            {/* if the search bar is not empty, check if querty has been fetched
            if it has and  */}
            {input.length > 0 ? (
                //what will be listed below the search bar
                <CommandList className="absolute bg-white top-full inset-x-0 shadow rounded-b-md">
                    {isFetched && <CommandEmpty>No results found</CommandEmpty>}
                    {(queryResults?.length ?? 0) > 0 ? (
                        //contains all found communities
                        <CommandGroup heading="Communities">
                            <hr className="mb-2"></hr>
                            {queryResults?.map((subreddit) => (
                                
                                //event will be subreddit name
                                //CommandItem requires a key since it is mapping 
                                <CommandItem
                                    key={subreddit.id}
                                    value={subreddit.name}
                                    onSelect={(e) => {
                                        //navigate user to selected item 
                                        router.push(`/d/${e}`)
                                        router.refresh()
                                    }}>
                                    <Users className="mr-2 h-4 w-4" />
                                    <a href={`/d/${subreddit.name}`}>d/{subreddit.name}</a>
                                    <hr className ="m-2"></hr></CommandItem>
                                   
                            ))}
                        </CommandGroup>
                    ) : null}

                </CommandList>
            ) : null}
        </Command>
    )
}

export default SearchBar