import NextAuth from "next-auth/next"
//this file, in the catch all [...nextauth] folder, is for authentication
const handler = NextAuth(authOptions) =>{

}

export { handler as GET, handler as POST }