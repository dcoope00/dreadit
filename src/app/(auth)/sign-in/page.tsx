import { buttonVariants } from "@/components/ui/Button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import SignIn from "../../../components/SignIn"


//this component is the overall signin page rendered onClick of the sign-in button.
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
                Home
            </Link>

            <SignIn />
        </div>
    </div>
}

export default page

