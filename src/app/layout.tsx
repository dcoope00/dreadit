import '@/styles/globals.css'
import {Inter} from "next/font/google"
import {cn} from "@/lib/utils"
import NavBar from "../components/NavBar"
import { Toaster } from '@/components/ui/Toaster'

//This file is created automatically by next.js
export const metadata = {
  title: 'dreadit',
  description: 'A Reddit clone built with Next.js and TypeScript.',
}

//imported font 
const inter = Inter({subsets: ['latin']})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    //cn() is a function in util.ts that takes any number of classNames as args and combines them
    <html lang='en' className={cn('bg-white text-slate-900 antialiased' , inter.className)}>  
      <body className='min-h-screen pt-12 bg-slate-50 antialiased'>
        <NavBar />

      <div className = "container max-w-7xl mx-auto h-full pt-12">
      {children}

      </div>
      <Toaster/>
      </body>
    </html>
  )
}
