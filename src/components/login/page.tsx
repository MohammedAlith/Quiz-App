"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginApi, LoginResult } from "./action";
import { useAuth } from "../context/AuthContext";
import { useScore } from "../context/scoreContext";

export default function Login() {
  const router = useRouter();
  const { setAccessToken } = useAuth();
  const { resetAnswers } = useScore(); 
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (formData: FormData) => {
    setError(null);
    try {
      const result: LoginResult = await LoginApi(formData);
      if (result.success) {
        
        localStorage.setItem("accessToken", result.accessToken);
        console.log(result.accessToken,"accessToken");
        setAccessToken(result.accessToken);

      
        resetAnswers(); 

      
        router.push("/quizHome");
      } else {
        setError(result.error);
      }
    } catch {
      setError("Unexpected error occurred");
    }
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await handleLogin(formData);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-5 p-5">
      <h1 className="text-3xl font-bold text-white">QUIZ APP</h1>

      <form
        onSubmit={submit}
        className="bg-white rounded-2xl flex flex-col gap-5 items-center p-6 sm:p-8 w-full max-w-xs sm:max-w-sm shadow-lg"
      >
        <h1 className="text-2xl font-bold">LOGIN</h1>

        <div className="flex flex-col gap-1 w-full">
          <label className="text-lg sm:text-xl">Username</label>
          <input
            name="username"
            type="text"
            className="border rounded-md p-2 outline-none w-full"
            required
          />
        </div>

        <div className="flex flex-col gap-1 w-full">
          <label className="text-lg sm:text-xl">Password</label>
          <input
            name="password"
            type="password"
            className="border rounded-md p-2 outline-none w-full"
            required
          />
        </div>

        {error && <p className="text-red-500 text-md">{error}</p>}

        <button className="rounded-md bg-blue-500 px-6 py-2 text-lg sm:text-xl text-white font-bold cursor-pointer">
          Login
        </button>
      </form>
    </div>
  );
}
