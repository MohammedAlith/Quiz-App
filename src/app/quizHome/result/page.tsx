import ResultShow from '../../../components/resultShow';
import { cookies } from 'next/headers';

export default async function ResultPage() {
  const cookieStore = await cookies();
  const saved = cookieStore.get('quizAnswers')?.value;

  let answersData = [];
  try {
    answersData = saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("Failed to parse quizAnswers cookie:", error);
  }

  return <ResultShow answer={answersData} />;
}
