'use client';

import { useRouter } from 'next/navigation';

export default function StartButton() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/quizHome/quizzes');
  };

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 bg-blue-500 text-white rounded-md"
    >
      Start Quiz
    </button>
  );
}
