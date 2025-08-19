"use client";

import { useState, useEffect } from "react";
import StartButton from "./startButton";

interface Category {
  id: number;
  name: string;
}

export function QuizCategory() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState("0");
  const [difficulty, setDifficulty] = useState("any");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://opentdb.com/api_category.php");
      if (!res.ok) throw new Error("Failed to fetch categories");
      const data = await res.json();
      console.log(data,"categories");
      setCategories(data.trivia_categories || []);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("something Went wrong. Please try again later.");
    } 
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    }, []);

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p className="text-red-500 text-Xl">{error}</p>;

  return (
    
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <label>Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 rounded-md w-full border outline-none"
        >
          <option value="0">Any Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label>Difficulty</label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="p-2 rounded-md w-full border outline-none"
        >
          <option value="any">Any Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      <div className="self-center">
        <StartButton category={category} difficulty={difficulty} />
      </div>
    </div>
  );
}
