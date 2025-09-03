import SingleQuiz from "@/components/singleQuiz";

export interface Quiz {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}
export default async function QuizzesPage({ searchParams }:any) {
  const category = await searchParams?.category || "0";
  const difficulty = await searchParams?.difficulty || "any";

  const fetchUrl =
    category === "0" && difficulty === "any"
      ? "https://opentdb.com/api.php?amount=10"
      : category !== "0" && difficulty === "any"
      ? `https://opentdb.com/api.php?amount=10&category=${category}`
      : category === "0" && difficulty !== "any"
      ? `https://opentdb.com/api.php?amount=10&difficulty=${difficulty}`
      : `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}`;

  const res = await fetch(fetchUrl, { cache: "force-cache" });
  const data = await res.json();
  console.log(data,"quizzes");
  const quizzes: Quiz[] = data.results || [];

  return <SingleQuiz singlequizzes={quizzes} />;
}
