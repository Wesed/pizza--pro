'use client'

import { QueryClientProvider } from "@tanstack/react-query"
import { ReactNode } from "react"
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient()


export function ReactQueryProvider({children}: {children: ReactNode}) {
  return <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
}