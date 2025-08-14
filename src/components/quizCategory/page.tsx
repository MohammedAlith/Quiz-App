

export async function QuizCategory() {
  
  let category: { id: number; name: string }[] = [];

  try {
    const response = await fetch("https://opentdb.com/api_category.php", {
      cache: "no-store", 
    });

    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }

    const data = await response.json();
    category = data?.trivia_categories || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <label>Category</label>
        <select className="p-2 rounded-md w-full border outline-none">
          <option value="">Any Category</option>
          {category.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label>Difficulty</label>
        <select className="p-2 rounded-md w-full border outline-none">
          <option value="any">Any Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
    </div>
  );
}
