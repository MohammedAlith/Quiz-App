'use client'

import { useRouter } from "next/navigation"
import { useScore } from '../components/context/scoreContext'

export default function Backbutton() {
  const router = useRouter()
  const { resetAnswers } = useScore()

  const handleBack = () => {
  
    localStorage.removeItem('quizAnswers')
    localStorage.removeItem('quizPage')


    resetAnswers()

  
    router.back()
  }

  return (
    <button
      onClick={handleBack}
      className="bg-gray-900 text-white p-2 rounded-lg cursor-pointer"
    >
      Back
    </button>
  )
}
