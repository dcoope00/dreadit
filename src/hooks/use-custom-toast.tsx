import Link from "next/link"
import { toast } from "./use-toast"
import { buttonVariants } from "@/components/ui/Button"
import { cn } from "@/lib/utils"

//a custom toast component to use anywhere an unauthorized action is performed
const useCustomToast= () => {


    const loginToast = () => {
        //dismiss is from "/use-toast"
        const {dismiss} = toast({
            title: "Login required.",
            description: "You need to be logged in to perform this action.",
            variant: "destructive",
            action: (
                <Link 
                onClick = {() => {
                    dismiss()
                }}
                className = {cn(buttonVariants({variant: "outline"}), "")} 
                href = "/sign-in">Login
                </Link>
            )
        })

    }



    return {loginToast}

}
export default useCustomToast