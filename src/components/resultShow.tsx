"use client";

import { useEffect } from "react";
import { useScore, Answer } from "./context/scoreContext";
import { format } from "path/win32";

interface Props {
  answer?: Answer[];
  quizId?: number; 
}

export default function ResultShow({ answer, quizId }: Props) {
  const { answers: contextAnswers, score, total } = useScore();
  const answers = answer?.length ? answer : contextAnswers;

  useEffect(() => {
    if (answers.length === 0) return;
    let totalTime = 0;
   for (let i = 0; i < answers.length; i++) {
  totalTime += answers[i].timeTaken;
}
const resultToStore = {
      id: Date.now(),
      answers,
      score,
      total,
      totalTime,
      date: new Date().toISOString(),
    };

    const savedResults = localStorage.getItem("allQuizResults");
    const allResults = savedResults ? JSON.parse(savedResults) : [];
 console.log(allResults);
 console.log(answers);

    allResults.push(resultToStore);
    localStorage.setItem("allQuizResults", JSON.stringify(allResults));
    localStorage.setItem("quizPage", "true");
  }, [answers, score, total]);

   let totalTime = 0*60;
  for (let i = 0; i < answers.length; i++) {
    totalTime += answers[i].timeTaken;
  }

  const minutes=(totalTime/60)|0;
  const seconds=totalTime%60;
  const formatTime=`${minutes}m ${seconds}s`

  return (
    <div className="p-4 w-screen flex flex-col gap-3">
      <h2 className="text-2xl font-bold mb-6 text-center text-white">
        Quiz Results
      </h2>

      <div className="flex gap-8 justify-center">
        <div className="flex flex-col gap-2">
          <p className="text-lg font-semibold text-center text-white">Total TimeTaken:</p>
          <div className="text-red-950 bg-white rounded-full w-24 h-24 flex items-center justify-center m-auto shadow-md">
            <h1 className="text-md font-bold m-0">{formatTime} </h1>
          </div>
        </div>

        <div className="h-32 w-1 m-2 rounded-sm bg-white"></div>

        <div className="flex flex-col gap-2">
          <p className="text-lg font-semibold text-center text-white">Final Score:</p>
          <div className="text-red-950 bg-white rounded-full w-24 h-24 flex items-center justify-center m-auto shadow-md">
            <h1 className="text-xl font-bold m-0">
              {score}/{total}
            </h1>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {answers.map((ans, idx) => (
          <div
            key={`${quizId ?? "current"}-${idx}`} // unique across quizzes
            className="border p-4 rounded-xl bg-white shadow-md flex flex-col gap-5"
          >
            <p className="font-semibold mb-2">
              {idx + 1}. {ans.question}
            </p>

            <div className="flex flex-col gap-2">
              {ans.options.map((option, optIdx) => {
                let style = "p-2 rounded-lg border";

                if (option === ans.selected) {
                  style +=
                    ans.selected === ans.correct
                      ? " bg-green-200 border-green-500"
                      : " bg-red-200 border-red-500";
                } else {
                  style += " bg-gray-100 border-gray-300";
                }

                return (
                  <div key={optIdx} className={style}>
                    {option}
                  </div>
                );
              })}
            </div>

            <p className="font-medium text-md">
              Correct Answer: <span className="font-bold text-green-500">{ans.correct}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
