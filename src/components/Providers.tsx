"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

//this is a client component because context only works client side. cannot be pre rendered on server
//will wrap the application with the children props
const Providers = ({ children }: { children: React.ReactNode }) => {
    const queryClient = new QueryClient()

    return (
        //QueryClientProvider requires a queryClient
        <QueryClientProvider client={queryClient}> {children}</QueryClientProvider>

    )

}

export default Providers