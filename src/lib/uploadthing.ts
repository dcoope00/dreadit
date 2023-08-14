import {generateReactHelpers} from "@uploadthing/react/hooks"
import type {OurFileRouter} from "@/app/api/uploadthing/core"

//a function to upload files that works with api\uploadthing\core.ts for type safety
export const {uploadFiles} = generateReactHelpers<OurFileRouter>()


