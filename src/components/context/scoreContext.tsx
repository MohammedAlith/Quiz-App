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
  resetAnswers: (questionCount?: number) => void;
}

const ScoreContext = createContext<ScoreContextType | undefined>(undefined);

export function ScoreProvider({ children }: { children: ReactNode }) {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [score, setScore] = useState(0);
  const total=answers.length;

  
  useEffect(() => {
    if (answers.length > 0) return; 
    const saved = localStorage.getItem('quizAnswers');
    if (saved) {
      const parsed: Answer[] = JSON.parse(saved);
      setAnswers(parsed);
      setScore(parsed.filter(a => a.correct === a.selected).length);
      
    }
  }, [answers.length]);

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

  const resetAnswers = (questionCount = 0) => {
    setAnswers([]);
    setScore(0);
    
    localStorage.removeItem('quizAnswers');
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
