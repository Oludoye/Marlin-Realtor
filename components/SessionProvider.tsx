'use client'

import { SessionProvider as Provider } from "next-auth/react"

type Props = {
  children: React.ReactNode;
}

// Make sure this is a default export
export default function SessionProvider({ children }: Props) {
  return <Provider>{children}</Provider>
  

}