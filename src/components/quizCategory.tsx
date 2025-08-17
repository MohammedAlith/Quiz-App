"use client";

import { useState, useEffect } from "react";

interface Category {
  id: number;
  name: string;
}

interface Props {
  category: string;
  difficulty: string;
  setCategory: (val: string) => void;
  setDifficulty: (val: string) => void;
}

export default function QuizCategory({
  category,
  difficulty,
  setCategory,
  setDifficulty,
}: Props) {
  const [categories, setCategories] = useState<Category[]>([]);

  
  
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://opentdb.com/api_category.php",{
          cache:"force-cache"
        });
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        console.log(data,'data')
        setCategories(data.trivia_categories || []);
        console.log(setCategories, 'cat')
      } catch (err) {
        console.error(err);
      }
    };
    
  


  useEffect(()=>{
  fetchCategories()
  },[])

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <label>Category</label>
        <select
          value={category}
          
          onChange={(e) => {setCategory(e.target.value)
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

      <div className="flex flex-col gap-1">
        <label>Difficulty</label>
        <select
          value={difficulty}
          onChange={(e) => {setDifficulty(e.target.value);
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
    </div>
  );
}
