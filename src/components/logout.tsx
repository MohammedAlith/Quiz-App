'use client';

import { useRouter } from 'next/navigation';


export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
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
    <div className='flex'>
    <button
      className="bg-red-500 text-white rounded-lg p-2 cursor-pointer "
      onClick={handleLogout}>
      Logout
    </button>
    </div>
  );
}
