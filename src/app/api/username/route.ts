import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { UsernameRequest, UsernameValidator } from "@/lib/validators/username";
import { z } from "zod";


export async function PATCH(req: Request) {

    try {
        const session = await getAuthSession()

        if (!session?.user) {
            return new Response("Unauthorized action", { status: 401 })
        }

        const body = await req.json()
        //validating the body with the zod schema to make sure it is correct format
        const { name } = UsernameValidator.parse(body)

        //check if username is taken already
        const username = await db.user.findFirst({
            where: {
                username: name
            },

        })
        if (username) {
            return new Response("Username already taken", { status: 409 })
        }
        //update username
        await db.user.update({
            where: {
                id: session.user.id,

            },
            data: {
                username: name
            }

        })

        return new Response("OK")


    } catch (error) {
        if(error instanceof z.ZodError){
            //if error is from parsing, data is invalid
            return new Response("Invalid PATCH request data passed", {status: 422})
        }

        return new Response("Could not change username", {status: 500})
    }
}