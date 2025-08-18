"use client";

import { useState, useEffect } from "react";
import StartButton from "./startButton";

interface Category {
  id: number;
  name: string;
}

export  function QuizCategory() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [category, setCategory] = useState("0");
  const [difficulty, setDifficulty] = useState("any");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://opentdb.com/api_category.php", {
          
          next:{revalidate:10*60}
        });
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        setCategories(data.trivia_categories || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {/* Category Dropdown */}
      <div className="flex flex-col gap-1">
        <label>Category</label>
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            console.log("Selected Category:", e.target.value);
          }}
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

      {/* Difficulty Dropdown */}
      <div className="flex flex-col gap-1">
        <label>Difficulty</label>
        <select
          value={difficulty}
          onChange={(e) => {
            setDifficulty(e.target.value);
            console.log("Selected difficulty:", e.target.value);
          }}
          className="p-2 rounded-md w-full border outline-none"
        >
          <option value="any">Any Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      {/* Start Button */}
      <div className="self-center">
        <StartButton category={category} difficulty={difficulty} />
      </div>
    </div>
  );
}
