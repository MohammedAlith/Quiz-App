"use client";

import { useState } from "react";
import QuizCategory from "./quizCategory";
import StartButton from "./startButton";

export default function QuizCategoryWrapper() {
  
  const [category, setCategory] = useState("0");
  const [difficulty, setDifficulty] = useState("any");

  return (
    <div className="flex flex-col gap-4">
    
      <QuizCategory
        category={category}
        difficulty={difficulty}
        setCategory={setCategory}
        setDifficulty={setDifficulty}
      />
      <div className="self-center">
        <StartButton category={category} difficulty={difficulty} />
      </div>
    </div>
  );
}
