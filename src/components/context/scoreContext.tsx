"use client";

import { createContext, useContext, useState } from "react";

export interface Answer {
  question: string;
  selected: string | null;
  correct: string;
  isCorrect: boolean;
  options: string[];
  timeTaken: number;
}

interface ScoreContextType {
  score: number;
  total: number;
  answers: Answer[];
  increaseScore: () => void;
  resetScore: (total: number) => void;
  saveAnswer: (ans: Answer) => void;
}

const ScoreContext = createContext<ScoreContextType | undefined>(undefined);

export const ScoreProvider = ({ children }: { children: React.ReactNode }) => {
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);

  const increaseScore = () => setScore((s) => s + 1);
  const resetScore = (t: number) => {
    setScore(0);
    setTotal(t);
    setAnswers([]);
  };
  const saveAnswer = (ans: Answer) => setAnswers((prev) => [...prev, ans]);

  return (
    <ScoreContext.Provider value={{ score, total, answers, increaseScore, resetScore, saveAnswer }}>
      {children}
    </ScoreContext.Provider>
  );
};

export const useScore = () => {
  const ctx = useContext(ScoreContext);
  if (!ctx) throw new Error("useScore must be used inside ScoreProvider");
  return ctx;
};
