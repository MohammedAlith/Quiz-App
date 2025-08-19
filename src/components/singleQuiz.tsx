'use client';

import { decode } from 'html-entities';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Answer, useScore } from '../components/context/scoreContext';

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
  const [options, setOptions] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(10);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [stop, setStop] = useState(false);

  const { addAnswer, score, resetAnswers } = useScore();
  const quiz = singlequizzes[page];
  const router = useRouter();

  useEffect(() => {
    const storedPage = localStorage.getItem('quizPage');
    if (storedPage) setPage(Number(storedPage));
  }, []);

  useEffect(() => {
    localStorage.setItem('quizPage', page.toString());
  }, [page]);

  useEffect(() => {
    if (!quiz) return;
    setLoadingOptions(false);
    const shuffled = [...quiz.incorrect_answers.map(ans => decode(ans)), decode(quiz.correct_answer)]
      .sort(() => Math.random() - 0.5);
    setOptions(shuffled);
    setSelectedAnswer(null);
    setTimeLeft(10);
    setStop(false);
  }, [quiz]);

  
  useEffect(() => {
      if (stop) return; 
    if (timeLeft <= 0) {
      handleAnswer(null); 
      return;
    }
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const isCorrect = (option: string) => option === decode(quiz.correct_answer);

  
  const handleAnswer = (answer: string | null) => {
    if (selectedAnswer !== null) return; 
   
    if (stop) return; 
    setStop(true);
    setSelectedAnswer(answer);
    setSelectedAnswer(answer);

    const answerObj: Answer = {
      question: decode(quiz.question),
      options,
      correct: decode(quiz.correct_answer),
      selected: answer || '',
      timeTaken: 10 - timeLeft,
    };

    addAnswer(answerObj);

  
    setTimeout(() => {
      if (page < singlequizzes.length - 1) {
        setPage(page + 1);
      } else {
        router.push('/quizHome/result');
      }
    }, 2000);
  };

  if (!quiz) return <p className="text-center mt-8">No quiz available</p>;

return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="border p-4 rounded-md bg-white flex flex-col gap-3 items-stretch shadow">
        <div className="flex justify-between items-center">
          <div className="font-semibold text-blue-600">
            Score: {score}/{singlequizzes.length}
          </div>
          <div className="text-red-500 font-bold">Timer: {timeLeft}</div>
        </div>

        <p className="font-semibold">{page + 1}. {decode(quiz.question)}</p>
        
        {loadingOptions ? (
          <p className="text-center text-gray-500 py-4 text-lg">Loading options...</p>
        ) : (
      
          <div
            className={`flex flex-col gap-2 ${stop ? 'pointer-events-none opacity-70' : ''}`}
          >
            {options.map((option, idx) => {
              let style = 'p-2 rounded cursor-pointer';
              if (selectedAnswer) {
                if (isCorrect(option)) style += ' bg-green-500';
                else if (option === selectedAnswer) style += ' bg-red-500';
              }
              if (!selectedAnswer && timeLeft <= 0) {
                style += ' bg-gray-300 cursor-not-allowed';
              }
              return (
                <label
                  key={idx}
                  className={`${style} flex items-center gap-2`}
                  onClick={() => handleAnswer(option)}
                >
                  <input
                    type="radio"
                    name={`question-${page}`}
                    value={option}
                    checked={selectedAnswer === option}
                    readOnly
                  />
                  {option}
                </label>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}