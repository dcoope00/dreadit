import { Icons } from "./Icons"
import Link from "next/link"
import UserAuthForm from "./UserAuthForm"


//this is a server component and therefore cannot have interactivity such as react hooks, event handlers, or use the custom Button.tsx component
const SignUp = () =>{

    return (
        <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
            <div className="flex flex-col space-y-2 text-center">
                <Icons.logo className = "mx-auto h-10 w-10" />
                <h1 className = "text-2xl font-semibold tracking-tight">Welcome to Dreadit Sign-Up</h1>

                <p className = "text-small m-width-xs mx-auto pt-1">Already a Dreadittor?{' '}
                <Link href = "/sign-in" className="hover:text-brand text-sm underline underline-offset-4 ">Sign In</Link>
                </p>
                <p className = "pb-1">or</p>
                <UserAuthForm  className = "pb-5"/>

                <p className = "px-8 text-center text-sm text-zinc-700">By creating an account, you agree to our User Agreement and Privacy Policy</p>
                {/* since UserAuthForm extends HTMLAttribute and passes HTMLDivElement as a generic, UserAuthForm here
                has access to any properties that a normal div element has  */}
            </div>

        </div>
    )

}

export default SignUp