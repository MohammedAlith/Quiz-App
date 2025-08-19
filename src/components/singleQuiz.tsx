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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [options, setOptions] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(10);
  const [loadingOptions, setLoadingOptions] = useState(true);

  const { addAnswer, score,  resetAnswers } = useScore();
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
    if(singlequizzes.length<0){
    resetAnswers(singlequizzes.length)
    };
  }, [singlequizzes]);

  
  useEffect(() => {
    if (!quiz) return;
     setLoadingOptions(false);
    const shuffled = [...quiz.incorrect_answers.map(ans => decode(ans)), decode(quiz.correct_answer)]
      .sort(() => Math.random() - 0.5);
    setOptions(shuffled);
    setSelectedAnswer(null);
    setIsSubmitted(false);
    setTimeLeft(10);
  }, [quiz]);


  useEffect(() => {
    if (isSubmitted || timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isSubmitted]);

  const isCorrect = (option: string) => option === decode(quiz.correct_answer);

  const handleSubmit = () => {
  if (isSubmitted) return;

  setIsSubmitted(true); 
  
};

const goNext = () => {
  
  const answerObj: Answer = {
    question: decode(quiz.question),
    options,
    correct: decode(quiz.correct_answer),
    selected: selectedAnswer || '',
    timeTaken: 10 - timeLeft,
  };

  addAnswer(answerObj); 

  if (page < singlequizzes.length - 1) {
    setPage(page + 1);
  } else {
    router.push('/quizHome/result');
  }
};


  if (!quiz) return <p className="text-center mt-8">No quiz available</p>;
 

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="border p-4 rounded-md bg-white flex flex-col gap-3 items-stretch shadow">
        <div className="flex justify-between items-center">
          <div className="font-semibold text-blue-600">Score: {score}/{singlequizzes.length}</div>
          <div className="text-red-500 font-bold">Timer: {timeLeft}</div>
        </div>

        <p className="font-semibold">{page + 1}. {decode(quiz.question)}</p>
{loadingOptions ? (
  <p className="text-center text-gray-500 py-4 text-lg">Loading options...</p>
) :  ( !loadingOptions&&
  <div className="flex flex-col gap-2">
    {options.map((option, idx) => {
      let style = 'p-2 rounded cursor-pointer';
      if (isSubmitted) {
        if (isCorrect(option)) style += ' bg-green-300';
        else if (option === selectedAnswer) style += ' bg-red-300';
      }
      if (timeLeft === 0 && !isSubmitted) style += ' bg-gray-300 cursor-not-allowed';
      return (
        <label key={idx} className={`${style} flex items-center gap-2`}>
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
)}


        

        {!isSubmitted && timeLeft > 0 ? (
          <button onClick={handleSubmit} className="px-4 py-2 bg-green-500 text-white rounded w-fit" disabled={!selectedAnswer}>Submit</button>
        ) : (
          <button onClick={goNext} className="px-4 py-2 bg-blue-500 text-white rounded w-fit cursor-pointer">
            {page < singlequizzes.length - 1 ? 'Next' : 'Finish'}
          </button>
        )}
      </div>
    </div>
  );
}
