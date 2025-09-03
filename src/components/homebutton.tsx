"use client"
import { useRouter } from "next/navigation"
import { useScore } from '../components/context/scoreContext';

export default function HomeButton(){
const { resetAnswers } = useScore();
    const router=useRouter()

const clickHome=()=>{
      resetAnswers();

    router.push('/quizHome')
}

    return(
        <button
      className="bg-red-500 text-white rounded-lg p-2 cursor-pointer"
      onClick={clickHome}
    >
      Home
    </button>
    )
}