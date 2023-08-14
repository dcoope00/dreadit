
//used as an endpoint in components\Editor.tsx

import axios from "axios"

//href passed by editorjs automatically
//fetch href, get metadata from page, return to client
export async function GET(req: Request){
    const url = new URL(req.url)
    //passed by editorjs automatically
    const href = url.searchParams.get("url")
    //if there is no href
    if(!href){
        return new Response("Invalid href",{status: 400})
    }
    //axios get request to the href
    const res = await axios.get(href)

    //parse html recieved from res
    //matching html title element and returning whatever is in it
    //match is necessary to give editorjs what it expects as a return value
    const titleMatch = res.data.match(/<title>(.*?)<\/title>/)
    const title = titleMatch ? titleMatch[1] : ""

    const descriptionMatch = res.data.match(/<meta name="description" content="(.*?)"/)
    const description = descriptionMatch ? descriptionMatch[1] : ""

    const imageMatch = res.data.match(/<meta property="og:image" content="(.*?)"/)
    const imageUrl = imageMatch ? imageMatch[1] : ""
    //editorjs expects this specific format returned
    return new Response(
        JSON.stringify({
            success: 1,
            meta: {
                title,
                description,
                image:{
                    url: imageUrl
                }
            }
        })
    )
}