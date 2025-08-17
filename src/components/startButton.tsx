"use client";
import { useRouter } from "next/navigation";

interface Props {
  category: string;
  difficulty: string;
}

export default function StartButton({ category, difficulty }: Props) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/quizHome/quizzes?category=${category}&difficulty=${difficulty}`);
  };

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 bg-blue-500 text-white rounded-md mt-4"
    >
      Start Quiz
    </button>
  );
}
