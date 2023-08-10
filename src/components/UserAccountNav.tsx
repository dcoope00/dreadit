"use client"
import { User } from "next-auth"
import { FC } from "react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/DropdownMenu"
import Avatar from '@mui/material/Avatar';
import UserAvatar from "./UserAvatar";
import Link from "next/link";
import { signOut } from "next-auth/react";
//this is a functionComponent for the user dropdown menu in NavBar.
interface UserAccountNavProps {
    //Pick<Type, Keys> is a mapped type that allows entering a custom type.
    //Pick info => https://ultimatecourses.com/blog/using-typescript-pick-mapped-type
    user: Pick<User, "name" | "email" | "image">
}

const UserAccountNav: FC<UserAccountNavProps> = ({ user }) => {
    const avatarStyle = {
        height: "2rem",
        width: "2rem"

    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                {/* <UserAvatar user = {
                    {name: user.name || null,
                     image: user.image || null,
                     }} className = "h-8 w-8" 
                    /> */}
                <Avatar src={user.image?.toString()} sx={avatarStyle} alt="default" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col leading-none">
                        {user.name && <p className="font-medium pb-1">{user.name}</p>}
                        {user.email && <p className="truncate text-sm text-zinc-700 font-normal">{user.email}</p>}
                    </div>
                </div>
                <DropdownMenuSeparator />
                {/* setting the DropdownMenuItem asChild prevents rendering it with a button to use the Link component as a button instead */}
                <DropdownMenuItem asChild>
                    <Link href="/">Feed</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/d/create">Create community</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href="/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={(event) => {
                    event.preventDefault()
                    signOut()       //next-auth method to make signing out very simple
                }}
                    className="cursor-pointer">
                    Sign out
                </DropdownMenuItem>


            </DropdownMenuContent>



        </DropdownMenu>

    )

}

export default UserAccountNav