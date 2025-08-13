import Link from "next/link";

export default function StartButton(){
    return(
        <Link href='./quizHome/quizCategory'>
        <button className="bg-blue-200 p-2">start</button>
        </Link>
    )
}