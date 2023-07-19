"use client"              //putting "use client at the top specifies this is a client component when it is a server component by default"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "./ui/Button"
import { FC, useState } from "react"
import { signIn } from "next-auth/react"
import { Icons } from "./Icons"
import { useToast } from "@/hooks/use-toast"
import React from "react"

//extending React.HTMLAttributes allows to apply styling from parent of wherever UserAuthForm is rendered
//it accepts a generic HTMLDivElement in this case
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }


//this is a client functional component (FC) to be used in the server component SignIn.tsx
//structuring components this way provides type safety
const UserAuthForm: FC<UserAuthFormProps> = (props) => {

    const [isLoading, setIsLoading] = useState(false)
    //a shadcn/ui component to display messages to the user. useToast returns a function "toast" to show the toast
    const {toast} = useToast()
    const loginWithGoogle = async () => {
        setIsLoading(true)

        try {
            await signIn("google")
        } catch (error) {
            //to display a toast set the title, description, and variant fields. Variant options are located in Toast.tsx
            toast({
                title: "There was a problem",
                description: "Error logging in with Google",
                variant: "destructive"
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        //using the combiner function to combine "flex justify-center" with a className prop
        //and tacking on any other classNames passed as props
        <div className={cn("flex justify-center", props.className)} {...props}>
            {/* size is a property in the Button.tsx class */}
            <Button onClick={loginWithGoogle} isLoading={isLoading}  size="sm" className="w-auto">
                {isLoading && <p>Loading...</p>}
                {!isLoading && <Icons.google className = "h-7 w-7 pr-2 "></Icons.google>}
                {!isLoading && "Continue with Google"}
            </Button>
        </div>
    )
}

export default UserAuthForm