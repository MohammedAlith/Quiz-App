"use client";

import { useScore } from "../../components/context/scoreContext";

export default function Result() {
  const { answers, score, total } = useScore();

  const totalTime = answers.reduce((acc, ans) => acc + ans.timeTaken, 0);

  return (
    <div className="p-4 w-screen">
      <h2 className="text-2xl font-bold mb-6 text-center">Quiz Results</h2>

      <p className="text-lg font-semibold text-center mb-4">
        Final Score: <span className="text-blue-600">{score}/{total}</span>
      </p>

      <p className="text-lg font-semibold text-center mb-8">
        Total Time: <span className="text-red-600">{totalTime}s</span>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {answers.map((ans, idx) => (
          <div key={idx} className="border p-3 rounded-xl bg-white shadow-md">
            <p className="font-semibold mb-2">
              {idx + 1}. {ans.question}
            </p>

            <div className="flex flex-col gap-2">
              {ans.options.map((option, optIdx) => {
                let style = "p-2 rounded-lg border";
                if (option === ans.correct) style += " bg-green-200 border-green-500";
                else if (option === ans.selected && option !== ans.correct)
                  style += " bg-red-200 border-red-500";
                else style += " bg-gray-100 border-gray-300";

                return (
                  <div key={optIdx} className={style}>
                    {option}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
