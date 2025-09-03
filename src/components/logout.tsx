'use client';

import { useRouter } from 'next/navigation';
import { useScore } from '../components/context/scoreContext';

export default function LogoutButton() {
  const router = useRouter();
  const { resetAnswers } = useScore();

  const handleLogout = async () => {
    try {
       localStorage.removeItem('accessToken')
      localStorage.removeItem('allQuizResults')
      resetAnswers();

      
      const res = await fetch('/logout', { method: 'POST' });

      if (res.ok) {
        router.push('/'); 
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <button
      className="bg-red-500 text-white rounded-lg p-2 cursor-pointer"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}
