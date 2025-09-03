'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Answer {
  question: string;
  options: string[];
  correct: string;
  selected: string;
  timeTaken: number;
}

interface ScoreContextType {
  answers: Answer[];
  addAnswer: (ans: Answer) => void;
  score: number;
  total: number;
  resetAnswers: () => void;
}

const ScoreContext = createContext<ScoreContextType | undefined>(undefined);

export function ScoreProvider({ children }: { children: ReactNode }) {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [score, setScore] = useState(0);
  const total = answers.length;

  // Load saved answers on mount
  useEffect(() => {
    const saved = localStorage.getItem('quizAnswers');
    if (saved) {
      const parsed: Answer[] = JSON.parse(saved);
      setAnswers(parsed);
      setScore(parsed.filter(a => a.correct === a.selected).length);
    }
  }, []);

  const addAnswer = (ans: Answer) => {
    setAnswers(prev => {
      const alreadyExists = prev.some(a => a.question === ans.question);
      if (alreadyExists) return prev;

      const updated = [...prev, ans];
      setScore(updated.filter(a => a.correct === a.selected).length);
      localStorage.setItem('quizAnswers', JSON.stringify(updated));

      return updated;
    });
  };

  const resetAnswers = () => {
    setAnswers([]);
    setScore(0);
    localStorage.removeItem('quizAnswers');
    localStorage.removeItem('quizPage');
    localStorage.removeItem('quizzes');
  };

  return (
    <ScoreContext.Provider value={{ answers, addAnswer, score, total, resetAnswers }}>
      {children}
    </ScoreContext.Provider>
  );
}

export function useScore() {
  const context = useContext(ScoreContext);
  if (!context) throw new Error('useScore must be used inside ScoreProvider');
  return context;
}
