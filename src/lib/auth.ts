import { NextAuthOptions, getServerSession } from "next-auth"
import { db } from "./db"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import GoogleProvider from "next-auth/providers/google";
import { nanoid } from "nanoid"
//this component is used for the authentication logic
//the exported const "authOptions" is of type "NextAuthOptions"
export const authOptions: NextAuthOptions = {        // this syntax provides type safety
    //passing in the db class to the PrismaAdapter ensures only 1 instance of PrismaClient is running
    adapter: PrismaAdapter(db),
    //the session object is for configuration of various settings
    session: {
        //how the user session is saved(JSON Web Token)
        strategy: "jwt"
    },
    //specify urls to be used for a custom sign-in,sign-out or error page
    //need this to override default pages
    pages: {
        signIn: "/sign-in"
    },
    //an array of what OAuth providers are supported
    providers: [
        //Google provider takes an object of clientID and clientSecret
        GoogleProvider({
            //in TS the ! is a non-null assertion operator to remove null/undefined values
            //tells compiler to ignore possible undefined
            //the process.env variables are OAuth credentials 
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    //callbacks object is used to control what happens when an action is performed. must be async functions
    callbacks: {
        //session is called when a session is checked. token=JWT payload since JWT is used for the session strategy
        async session({ token, session }) {
            //define which values to have access to whenever a function from next-auth is called in any component to get current session
            //need to define a type for next auth(done in /types/next-auth.d.ts)
            //token attributes come from .node_modules/next-auth/jwt/types.d.ts and /types/next-auth.d.ts
            if (token) {
                session.user.id = token.id
                session.user.name = token.name
                session.user.email = token.email
                session.user.image = token.picture
                session.user.username = token.username

            }

            return session
        },
        //this callback is called when a jwt is created/updated(ex. at sign-in/whenever a session is accessed in the client)
        //after the first call, only the token arg is available
        //jwt is invoked before session callback. jwt output is passed to session callback as token
        //prisma queries are then-ables, they only execute on await or .then() or catch()."lazy evaluation"
        async jwt({ token, user }) {
            //looking for first record in the database that matches the criteria
            const dbUser = await db.user.findFirst({
                where: {
                    email: token.email,

                }
            })
            if (!dbUser) {
                //if no user in the db, just return the token
                token.id = user!.id
                return token
            }
            if (!dbUser.username) {
                //if user has no username, give user a default username where id matches dbUser.id 
                await db.user.update({
                    where: {
                        id: dbUser.id
                    },
                    data: {
                        username: nanoid(10)    //nanoid is a library for random string ids
                    }
                })
            }

            return {
                id: dbUser.id,
                name: dbUser.name,
                picture: dbUser.image,
                email: dbUser.email,
                username: dbUser.username,

            }
        },
        //redirect to home page on login
        redirect() {
            return "/"
        }
    }


}
//exporting this helper for use in NavBar
export const getAuthSession = () => {
    const session = getServerSession(authOptions)
    return session
}

