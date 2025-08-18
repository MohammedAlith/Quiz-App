import ResultShow from '../../../components/resultShow';
import { cookies } from 'next/headers';

export default async function ResultPage() {
  const cookieStore = await cookies();
  const saved = cookieStore.get('quizAnswers')?.value;
  const answersData = saved ? JSON.parse(saved) : [];

  return <ResultShow answer={answersData} />;
}
