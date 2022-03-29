import React from "react"

import Header from "./Components/Header"
import Loading from "./Components/Loading"

export default function MainLayout({ children }: any) {
  
  return <>
    <Header />
    <Loading />
    <div>
      {children}
    </div>
  </>
}