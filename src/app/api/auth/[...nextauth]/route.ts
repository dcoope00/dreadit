import NextAuth from "next-auth/next"
import {authOptions} from "@/lib/auth"
//this file, in the catch all [...nextauth] folder, is for authentication
//documentation for route handlers found at https://nextjs.org/docs/app/building-your-application/routing/router-handlers
const handler = NextAuth(authOptions)

//any call to this api route with GET or POST will be handled by "handler"
export { handler as GET, handler as POST }