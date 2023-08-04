
//conventions for route intercepting
//(.) matches same level segments
//(..) matches segments one level above
//(..)(..)matches segments two levels above
//(...) matches segments in the root app directory

import { FC } from "react";

//this modal component will intercept the sign-in page. On page reload will show the actual sign-in page
interface pageProps{

}


const page: FC<pageProps> = () => {

    return (
       
        <div className = "fixed inset-0 bg-zinc-900/20 z-10">
            <div className = "container flex items-center h-full max-w-lg mx-auto">

                <div className = "relative bg-white w-full h-fit py-20 rounded-lg">

                    
                </div>
            </div>
        </div>
     
    )
}

export default page
