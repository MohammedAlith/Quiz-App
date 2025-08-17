import QuizCategoryWrapper from "../../components/QuizCategoryWrapper";

export default function Welcome() {
  return (
    <div className="flex justify-center">
      <div className="bg-white p-6 sm:p-10 rounded-lg flex flex-col gap-4 ">
        <h1 className="font-bold text-center text-lg sm:text-2xl">
          Welcome to Quiz World
        </h1>

        
        <QuizCategoryWrapper />
      </div>
    </div>
  );
}
