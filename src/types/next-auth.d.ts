import type { Session, User } from "next-auth"
import type { JWT } from "next-auth/jwt"


//here is where next-auth specific types are defined for /auth.ts session callback
type UserId = string

//defining what the JWT will look like
declare module "next-auth/jwt" {
    interface JWT {
        id: UserId
        username?: string | null
    }
}

declare module "next-auth" {
    interface Session {
        user: User & {
            id: UserId
            username?: string | null
        }
    }
}