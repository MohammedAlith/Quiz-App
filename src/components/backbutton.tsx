'use client'

import { useRouter } from "next/navigation"

export default function Backbutton() {
  const router = useRouter()

  const handleBack = () => {
    router.back() 
      }

  return (
    <button
      onClick={handleBack}
      className="bg-gray-900 text-white p-2 rounded-lg hover:bg-red-300 transition"
    >
      Back
    </button>
  )
}
