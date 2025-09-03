// app/error.tsx
"use client";

import { useEffect } from "react";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Error caught in ErrorBoundary:", error);
  }, [error]);


  const errorMessage =
    error?.message || "Something went wrong. Please check your connection or try again.";

  const handleRetry = () => {
   reset();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-4xl font-bold text-red-500 mb-4"> Something went wrong</h1>
      <p className="mb-6 text-gray-700">
        {errorMessage}
      </p>
      <button
        onClick={handleRetry}
        
        className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Try Again
      </button>
    </div>
  );
}
