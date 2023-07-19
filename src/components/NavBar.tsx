import {Icons} from "./Icons"
import Link from "next/link"
import {buttonVariants} from "../components/ui/Button"

const NavBar = () =>{

   

    return (

        <div className = "fixed top-0 inset-x-0 h-fit bg-violet-900 border-bottom border-zinc-300 z-[10] py-2">
            <div className = "container max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
                <Link href = "/" className = "flex gap-2 items-center">
                    <Icons.logo className = "h-10 w-190 "></Icons.logo>
                    <p className = "hidden text-white text-sm font-medium md:block">Dreadit</p>
                </Link>
                {/* giving link a className of buttonVariants from the Button class will make the link component look like a button */}
                <Link href = "/sign-in" className={buttonVariants()} >Sign In</Link>


            </div>
            
        </div>

    )

}

export default NavBar