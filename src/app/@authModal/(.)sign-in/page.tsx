
//conventions for route intercepting
//(.) matches same level segments
//(..) matches segments one level above
//(..)(..)matches segments two levels above
//(...) matches segments in the root app directory

import CloseModal from "@/components/CloseModal";
import SignIn from "@/components/SignIn";
import { FC } from "react";

//this modal component will intercept the sign-in page. On page reload will show the actual sign-in page
interface pageProps{

}

  //by creating @authModal with the @ naming convention, the folder is receivable in the same level layout file via props
  //allows for parallel routes
const page: FC<pageProps> = () => {

    
    return (
       //background div
        <div className = "fixed inset-0 bg-zinc-900/20 z-10">
            {/* modal layout div */}
            <div className = "container flex items-center h-full max-w-lg mx-auto">
                {/* modal style div */}
                <div className = "relative bg-white w-full h-fit py-20 rounded-lg">
                    <div className = "absolute top-4 right-4">
                        <CloseModal />

                    </div>
                    {/* rendering the actual sign in component inside the modal */}
                    <SignIn />
                </div>
            </div>
        </div>
     
    )
}

export default page
