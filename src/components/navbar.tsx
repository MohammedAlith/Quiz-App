'use client'

import Logout from "./logout"
import Backbutton from "./backbutton"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const pathname = usePathname() 

  return (
    <div className="flex justify-between items-center p-2 ">
      
      
      {pathname !== '/quizHome' ? (
        <Backbutton />
      ) : (
        <div style={{ width: '70px' }} /> 
      )}
      <div className="text-center font-semibold">Score</div>

      
      <Logout />
    </div>
  )
}
