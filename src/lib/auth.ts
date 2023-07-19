import { NextAuthOptions } from "next-auth"
import { db } from "./db"
import {PrismaAdapter} from "@next-auth/prisma-adapter"

export const authOptions: NextAuthOptions ={
    adapter: PrismaAdapter(db)

}
