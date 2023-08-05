"use client"
import { X } from "lucide-react"
import { Button, buttonVariants } from "./ui/Button"
import {useRouter} from "next/navigation"




const CloseModal = () => {

    const router = useRouter()

    const handleClick = () => {
        //importing useRouter from next/navigation instead of next/router will allow different methods to be used
        router.back()
    }
    return (
        //labeling the Button with aria-label provides a more accessible app
        <Button
            variant="link"
            className="h-6 w-6 p-0 rounded-md"
            aria-label="close modal"
            onClick = {handleClick} >
            <X className="h-5 w-5" />
        </Button>
    )
}

export default CloseModal