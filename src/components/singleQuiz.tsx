"use client";

import { decode } from "html-entities";
import { useState, useEffect } from "react";

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
  const [isAnswered, setIsAnswered] = useState(false);
  const [options, setOptions] = useState<string[]>([]);

  const quiz = singlequizzes[page];

  useEffect(() => {
    if (!quiz) return;
    const newOptions = [
      ...quiz.incorrect_answers.map((ans) => decode(ans)),
      decode(quiz.correct_answer),
    ].sort(() => Math.random() - 0.5);
    setOptions(newOptions);
    setSelectedAnswer(null);
    setIsAnswered(false);
  }, [quiz]);

  const handleSelect = (option: string) => {
    if (isAnswered) return;
    setSelectedAnswer(option);
    setIsAnswered(true);
  };

  const isCorrect = (option: string) => option === decode(quiz.correct_answer);

  const goNext = () => {
    if (page < singlequizzes.length - 1) {
      setPage(page + 1);
    }
  };

  return (
    <div className="flex flex-col items-center h-screen ">
      <div className="border p-4 mt-10 w-70 rounded-md bg-white  flex flex-col gap-3 items-stretch">
        <p className="font-semibold ">
          {page + 1}. {decode(quiz.question)}
        </p>
        <div className="flex flex-col gap-2 ">
          {options.map((option, idx) => {
            let optionStyle =
              " p-2 rounded cursor-pointer transition-colors w-fit";

            if (isAnswered) {
              if (isCorrect(option)) {
                optionStyle += " bg-green-300";
              } else if (option === selectedAnswer) {
                optionStyle += " bg-red-300";
              }
            }

            return (
              <label
                key={idx}
                className={`${optionStyle} flex items-center gap-2`}
              >
                <input
                  type="radio"
                  name={`question-${page}`}
                  value={option}
                  checked={selectedAnswer === option}
                  onChange={() => handleSelect(option)}
                  disabled={isAnswered}
                />
                {option}
              </label>
            );
          })}
        </div>

        {page < singlequizzes.length - 1 ? (
          <button
            onClick={goNext}
            className="px-4 py-2 bg-blue-500 text-white rounded w-fit "
            disabled={!isAnswered}
          >
            Next
          </button>
        ) : (
          <button
            className="px-4 py-2 bg-green-500 text-white rounded self-end"
            disabled={!isAnswered}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
}
