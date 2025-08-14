import StartButton from "@/components/startButton";
import {QuizCategory} from '../../components/quizCategory/page'

export default function Welcome(){
    return(
        <div className="flex justify-center items-center p-4 h-screen">
  
  <div className="bg-white p-6 sm:p-10 rounded-lg flex flex-col gap-4 
                  items-stretch">
    
    <h1 className="font-bold text-center text-lg sm:text-2xl">
      Welcome to Quiz World
    </h1>
    
    <div>
        <QuizCategory/>
         </div>
       
       <div className="self-center">
      <StartButton />
    </div>
  </div>
</div>

    )
  
}