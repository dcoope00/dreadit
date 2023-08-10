import '@/styles/globals.css'
import {Inter} from "next/font/google"
import {cn} from "@/lib/utils"
import NavBar from "../components/NavBar"
import { Toaster } from '@/components/ui/Toaster'
import Providers from '@/components/Providers'

//This root layout file is created automatically by next.js and must remain a server component.
export const metadata = {
  title: 'dreadit',
  description: 'A Reddit clone built with React, Next, and TypeScript.',
}

//imported font 
const inter = Inter({subsets: ['latin']})

export default function RootLayout({
  children, authModal
}: {
  children: React.ReactNode
  //by creating @authModal with the @ naming convention, the folder is receivable in the same level layout file via props
  //allows for parallel routes
  authModal: React.ReactNode    
}) {
  return (
    //cn() is a function in util.ts that takes any number of classNames as args and combines them
    <html lang='en' className={cn('bg-white text-slate-900 antialiased' , inter.className)}>  
      <body className='min-h-screen pt-12 bg-slate-50 antialiased'>
        <Providers>
        {/* @ts-expect-error Server Component */}
        <NavBar />
     
        {authModal}

      <div className = "container max-w-7xl mx-auto h-full pt-12">
      {children}

      </div>
      <Toaster/>
      </Providers>
      </body>
    </html>
  )
}
