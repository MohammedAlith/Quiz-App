import Navbar from "@/components/navbar";


export default async function QuizHomeLayout({
  children,
}: {
  children: React.ReactNode
}) {

 
  return (
  <>
  <Navbar/>
  {children}
  </>
  )
}
