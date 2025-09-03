'use client'

import Logout from "./logout"
import Backbutton from "./backbutton"
import HomeButton from "./homebutton"
import { usePathname } from "next/navigation"
import OldResults from "./oldResults"
export default function Navbar() {
  const pathname = usePathname()

  return (
    <div className="flex justify-between items-center fixed top-0 left-0 w-full p-5 ">
      
      
      <div className="flex items-center gap-3">
        {pathname !== "/quizHome" && pathname !== "/quizHome/result" && (
          <Backbutton />
        )}
        {pathname === "/quizHome/result" && <HomeButton />}
        {pathname==='/quizHome' && <OldResults/>}
        
      </div>
       
      
      <Logout />
    </div>
  )
}
