import type { Session, User } from "next-auth"
import type { JWT } from "next-auth/jwt"


//here is where next-auth specific types are defined for /auth.ts session callback
type UserId = string

//adding more values to the default jwt interface found in .node_modules/next-auth/jwt/types.d.ts
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