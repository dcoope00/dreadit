import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { HomeIcon } from "lucide-react";
import Link from "next/link";

//the home page component
export default function Home() {
  return <>
    <h1 className="text-3xl font-bold md:text-4xl">Your feed</h1>


    <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6">
      {/*feed*/}

      {/*subreddit info */}

      {/* section to let user know they are on home page */}
      <div className="overflow-hidden h-fit rounded-lg border border-gray-500 order-first md:order-last">
        <div className="bg-violet-900 px-6 py-4 text-white">

          <p className="font-semibold py-3 flex items-center gap-1.5">
            <HomeIcon />
            Home
          </p>
        </div>

        <div className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
          <div className="flex justify-beteen gap-x-4 py-3">
            <p className="text-zinc-800">Your personal Dreadit homepage. Come here to check in with your favorite communities.
            </p>
          </div>
          {/* a Link disguised as a component for creating communities. buttonVariants can also accept a custom className */}
          <Link
            className={cn(buttonVariants({ className: "w-full mt-4 mb-6" }))}
            href="/d/create" >Create Community</Link>
        </div>
      </div>

    </div>
  </>


}
