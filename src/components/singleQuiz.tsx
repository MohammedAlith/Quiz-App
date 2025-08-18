"use client";

import { decode } from "html-entities";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Answer, useScore } from "./context/scoreContext";

export interface Quiz {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

interface Props {
  singlequizzes: Quiz[];
}

export default function SingleQuiz({ singlequizzes }: Props) {
  const [page, setPage] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(10);

  const { score, total, increaseScore, resetScore, saveAnswer } = useScore();
  const quiz = singlequizzes[page];
  const router = useRouter();

  // Reset score at start
  useEffect(() => {
    resetScore(singlequizzes.length);
  }, []);

  // Reset state on question change
  useEffect(() => {
    if (!quiz) return;
    const shuffledOptions = [
      ...quiz.incorrect_answers.map((ans) => decode(ans)),
      decode(quiz.correct_answer),
    ].sort(() => Math.random() - 0.5);

    setOptions(shuffledOptions);
    setSelectedAnswer(null);
    setIsSubmitted(false);
    setTimeLeft(10);
  }, [quiz]);

  // Timer countdown
  useEffect(() => {
    if (isSubmitted || timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isSubmitted]);

  const isCorrect = (option: string) => option === decode(quiz.correct_answer);

  const handleSubmit = () => {
    const correct = selectedAnswer ? isCorrect(selectedAnswer) : false;

    const answer: Answer = {
      question: decode(quiz.question),
      selected: selectedAnswer,
      correct: decode(quiz.correct_answer),
      isCorrect: correct,
      options,
      timeTaken: 10 - timeLeft,
    };

    saveAnswer(answer);
    if (correct) increaseScore();
    setIsSubmitted(true);
  };

 const goNext = () => {
  if (!isSubmitted) handleSubmit();
  console.log("Navigating...", page, singlequizzes.length);

  if (page < singlequizzes.length - 1) {
    setPage(page + 1);
  } else {
    setTimeout(() => {
      console.log("Pushing to result page");
      router.push("/result");
    }, 0);
  }
};



  return (
    <div className="flex flex-col items-center h-screen">
      <div className="border p-4 mt-10 w-[500px] rounded-md bg-white flex flex-col gap-3 items-stretch shadow">
        {/* Score and Timer */}
        <div className="flex justify-between items-center">
          <div className="font-semibold text-blue-600">
            Score: {score}/{total}
          </div>
          <div className="text-red-500 font-bold">⏳ {timeLeft}s</div>
        </div>

        {/* Question */}
        <p className="font-semibold">
          {page + 1}. {decode(quiz.question)}
        </p>

        {/* Options */}
        <div className="flex flex-col gap-2">
          {options.map((option, idx) => {
            let optionStyle = "p-2 rounded cursor-pointer transition-colors";

            if (isSubmitted) {
              if (isCorrect(option)) optionStyle += " bg-green-300";
              else if (option === selectedAnswer) optionStyle += " bg-red-300";
            }

            if (timeLeft === 0 && !isSubmitted) optionStyle += " bg-gray-300 cursor-not-allowed";

            return (
              <label key={idx} className={`${optionStyle} flex items-center gap-2`}>
                <input
                  type="radio"
                  name={`question-${page}`}
                  value={option}
                  checked={selectedAnswer === option}
                  onChange={() => setSelectedAnswer(option)}
                  disabled={isSubmitted || timeLeft === 0}
                />
                {option}
              </label>
            );
          })}
        </div>

        {/* Buttons */}
        {!isSubmitted && timeLeft > 0 ? (
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-500 text-white rounded w-fit"
            disabled={!selectedAnswer}
          >
            Submit
          </button>
        ) : (
          <button onClick={goNext} className="px-4 py-2 bg-blue-500 text-white rounded w-fit">
            {page < singlequizzes.length - 1 ? "Next" : "Finish"}
          </button>
        )}
      </div>
    </div>
  );
}
