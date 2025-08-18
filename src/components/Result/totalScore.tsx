"use client";

import { useScore } from "../context/scoreContext";

export  function TotalScore(){
  const { score, total } = useScore();
  return(
    <p>
       {score}/{total}
    </p>
  )
}