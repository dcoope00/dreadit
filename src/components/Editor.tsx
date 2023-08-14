"use client"

import { FC, useCallback, useEffect, useRef, useState } from "react";
import  TextareaAutosize  from "react-textarea-autosize";
import {useForm} from "react-hook-form"
import { PostCreationRequest, PostValidator } from "@/lib/validators/post";
import { zodResolver } from "@hookform/resolvers/zod";
//importing editorjs as a type because it is very large in size
import type EditorJS from "@editorjs/editorjs"
import { uploadFiles } from "@/lib/uploadthing";
interface EditorProps{
subredditId: string

}

const Editor: FC<EditorProps> = ({subredditId}) => {
    //using react-hook-form to make the text editor for a post
    //will automatically handle form submit errors
    //documentaion at: https://www.react-hook-form.com/api/useform/
    //useForm accepts a generic type to enforce using a resolver
    //can create a validator for client side validation of data from form submit
    //validator in ib\validators\post.ts
    const {
        //allows to register an input element to apply validation
        register,
        //will receive form data on successful submit
        handleSubmit,
        //contains information about form state to display any errors to user
        formState: {errors}


    } = useForm<PostCreationRequest>({
        resolver: zodResolver(PostValidator),
        defaultValues: {
            subredditId,
            title: "",
            content: null
        }
    })
    //instead of blocking rendering with editor, stream it in as it arrives for better user experience
    const ref = useRef<EditorJS>()

    const _titleRef = useRef<HTMLTextAreaElement>(null)
    //keep track of whether Editor.tsx is mounted or not
    const [isMounted, setIsMounted] = useState<boolean>(false)

    useEffect(() => {
        //window is defined on client side, undefined on server side
        if(typeof window !== "undefined"){
            setIsMounted(true)
        }

    },[])


    const initializeEditor = useCallback(async() => {
        //useCallback maintains throughout renders unless something changes in dependency array
        //@editorjs/editorjs is large so its streamed in instead of blocking render
        //editor.js documentation: https://editorjs.io/base-concepts/
        //Some plugins available in editorjs
        const EditorJS = (await import("@editorjs/editorjs")).default
        const Header = (await import("@editorjs/header")).default
        const Embed = (await import("@editorjs/embed")).default
        const Table = (await import("@editorjs/table")).default
        const List = (await import("@editorjs/list")).default
        const Code = (await import("@editorjs/code")).default
        const LinkTool = (await import("@editorjs/link")).default
        const InlineCode = (await import("@editorjs/inline-code")).default
        const ImageTool = (await import("@editorjs/image")).default

          //check if editor is already initialized or not
        if(!ref.current){
            const editor = new EditorJS({
                //div mounted to holder will have id of "editor"
                holder: "editor",
                //prevent reinitialization of same editor
                onReady(){
                    ref.current = editor
                },
                placeholder: "Type here to write your post...",
                //text options such as bold/italics when highlighting text
                inlineToolbar: true,
                //initial data
                data: {blocks: []},
                tools:{
                    header: Header,
                    //allows to paste links and preview metadata/image for them
                    linkTool: {
                        class: LinkTool,
                        config: {
                            endpoint: "/api/link"
                        }

                    },
                    //handling image uploads
                    //may change from uploadthing to AWS S3 in the future for more storage
                    image:{
                        class: ImageTool,
                        config: {
                            //handles uploading logic 
                            uploader:{
                                async uploadByFile(file: File){
                                    //uploading 1 file as an array
                                    //passing imageUploader provides typesafety
                                    const [res] = await uploadFiles([file],'imageUploader')
                                    //return editorjs specific response
                                    return {
                                        success:1,
                                        file:{
                                            url:res.fileUrl,
                                        }
                                    }
                                }
                            }
                        }
                    },
                    list: List,
                    code: Code,
                    InlineCode: InlineCode,
                    table: Table,
                    emdbed: Embed
                }

            })
        }

    }, [])

    useEffect(() => {
        //function to initialize editor
        const init = async() =>{
            await initializeEditor()

            setTimeout(() => {
                _titleRef.current?.focus()
            },0)
        }
        if(isMounted){
            init()
            return () => {
                //uninitalizing the editor
                ref.current?.destroy()
                ref.current = undefined
            }
        }
    },[isMounted, initializeEditor])

    //share the ref with react-hook-form so it has access as well as I
    const {ref: titleRef,...rest} = register("title")
    return (

        <div className = "w-full p-4 bg-zinc-50 rounded-lg border border-zinc-200">
            {/* using the form id from \app\d\[visitedSubreddit]\submit\page.tsx */}
            <form id="subreddit-post-form" className = "w-fit" >
                {/* documentation for Tailwind prose: https://tailwindcss.com/docs/typography-plugin */}
            <div className= "prose prose-stone dark:prose-invert">
                <TextareaAutosize 
                ref={(event) => {
                    //assign ref to react-hook-form
                    titleRef(event)
                    //assign ref to my ref
                    //@ts-ignore
                    _titleRef.current = event
                }}
                //pass everything else destructured from register title 
                {...rest}
                placeholder="Title" 
                className = "w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
                
                />

                <div id = "editor" className = "min-h-[500px]"/>
            </div>
            </form>
        </div>
    )

}

export default Editor


