import StartButton from "@/components/start"
import Link  from "next/link"

export default function Welcome(){
    return(
         <div>
              <h1>Welcome to Quiz World</h1>
              {/* <Link href='/quizCategory'>
              <button className="bg-green-200">Start</button>
              </Link> */}
              <StartButton/>

        </div>
    )
  
}