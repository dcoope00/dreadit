import NextAuth from "next-auth/next"
//this file, in the catch all [...nextauth] folder, is for authentication
const handler = NextAuth(authOptions) =>{

}

//any call to this api route with GET or POST will be handled by "handler"
export { handler as GET, handler as POST }