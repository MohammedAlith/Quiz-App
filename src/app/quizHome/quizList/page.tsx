"use client";

import { useEffect, useState } from "react";
import { Answer } from "@/components/context/scoreContext";

interface StoredResult {
  id: number;
  answers: Answer[];
  score: number;
  total: number;
  totalTime: number;
  date: string;
}

export default function ResultHistory() {
  const [results, setResults] = useState<StoredResult[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("allQuizResults");
    if (saved) {
      const allResults: StoredResult[] = JSON.parse(saved);
      setResults(allResults.reverse()); 
      console.log(allResults)
    }
  }, []);

  // const formatTime = (seconds: number) => {
  //   const mins = Math.floor(seconds / 60);
  //   const secs = seconds % 60;
  //   return `${mins}m ${secs}s`;
  // };

  if (results.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen text-white text-lg">
        No quiz results found.
      </div>
    );
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">Quiz History</h1>

      <div className="space-y-8">
        {results.map((quiz) => (
          <div key={quiz.id} className="bg-gray-800 rounded-2xl p-6 shadow-lg">
            <div className="flex gap-8 justify-center mb-6">
              
              <div className="flex flex-col gap-2 items-center">
                <p className="text-lg font-semibold text-white">Total Time</p>
                <div className="text-red-950 bg-white rounded-full w-24 h-24 flex items-center justify-center shadow-md">
                  <h2 className="font-bold">{quiz.totalTime}</h2>
                </div>
              </div>

              {/* Divider */}
              <div className="h-32 w-1 rounded-sm bg-white"></div>

              {/* Final Score */}
              <div className="flex flex-col gap-2 items-center">
                <p className="text-lg font-semibold text-white">Score</p>
                <div className="text-red-950 bg-white rounded-full w-24 h-24 flex items-center justify-center shadow-md">
                  <h2 className="font-bold text-xl">{quiz.score}/{quiz.total}</h2>
                </div>
              </div>
            </div>

            {/* Quiz Date
            <p className="text-center text-gray-300 mb-4">
              Attempted on: {new Date(quiz.date).toLocaleString()}
            </p> */}

            {/* Answers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {quiz.answers.map((ans, idx) => (
                <div key={idx} className="border p-4 rounded-xl bg-white shadow-md flex flex-col gap-3">
                  <p className="font-semibold mb-2">
                    {idx + 1}. {ans.question}
                  </p>

                  <div className="flex flex-col gap-2">
                    {ans.options.map((option, optIdx) => {
                      let style = "p-2 rounded-lg border";

                      if (option === ans.selected) {
                        style += ans.selected === ans.correct
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
        ))}
      </div>
    </div>
  );
}
