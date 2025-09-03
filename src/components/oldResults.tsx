'use client'
import { useRouter } from "next/navigation";

export default function OldResults(){
    const router=useRouter();
    const handleOldResults=()=>{
    router.push('/quizHome/quizList')
    }

    return(
        <button
      className="bg-red-500 text-white rounded-lg p-2 cursor-pointer"
      onClick={handleOldResults}>
      Previous Results
    </button>
    )

}