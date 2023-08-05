import { buttonVariants } from "@/components/ui/Button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import SignUp from "@/components/SignUp"


//this component is the overall signup page rendered onClick of the sign-up  button.
const page = () => {

    return <div className="absolute inset-0">
        <div className="h-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-20">
            {/* using the cn function in util.tsx to conditionally combine classNames and using the buttonVariants to apply the ghost variant to the button */}
            <Link
                href="/"
                className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "self-start -mt-20"
                )}>
                <ChevronLeft className = "mr-2 h-4 w-4"/>
                Home
            </Link>

            <SignUp/>
        </div>
    </div>
}

export default page

