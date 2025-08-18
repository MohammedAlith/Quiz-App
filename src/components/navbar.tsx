'use client'

import Logout from "./logout"
import Backbutton from "./backbutton"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const pathname = usePathname()

  return (
    <div className="flex justify-between items-center fixed top-0 left-0 w-full p-5">
      <div className="flex-1">
        {pathname !== "/quizHome" && pathname !== "/quizHome/result" && (
          <Backbutton />
        )}
      </div>
      <Logout />
    </div>
  )
}
