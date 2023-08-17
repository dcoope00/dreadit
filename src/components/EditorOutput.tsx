import dynamic from "next/dynamic";
import { FC } from "react";
import Image from "next/image"


//component to render output
//dynamic is a nextjs option for handling lazy loading. Improves initial loading performance by not importing until it is needed
//will use nextjs/image for better performance
const Output = dynamic(
    async() => (await import ("editorjs-react-renderer")).default,
    //fully rendering on client side instead of server side
    {ssr: false}
)

interface EditorOutputProps{
    content: any

}

const style = {
    paragraph:{
        fontSize: "0.875rem",
        lineHeight: "1.25rem",

    }
}

//using customer renderers for output
//responsible for rendering image/code post previews
const renderers = {
    image: CustomImageRenderer,
    code: CustomeCodeRenderer
}

const EditorOutput: FC<EditorOutputProps> = ({content}) => {
 
    
    return (
        //using the post.content prop as the data for the dynamically imported Output
        <Output 
        data = {content} 
        style = {style} 
        className = "text-sm" 
        renderers={renderers} />
    )
}


function CustomImageRenderer({data}: any){
    const src = data.file.url
    return (
        <div className="relative w-full min-h-[15rem]">
            {/* next/image component */}
            <Image alt = "image" className = "object-contain" fill src = {src}/>
        </div>
    )
}

function CustomeCodeRenderer({data}: any){
    return (
        <pre className = "bg-gray-800 rounded-md p-4">
            <code className = "text-gray-100 text-sm">
                {data.code}
            </code>
        </pre>
    )

}

export default EditorOutput

