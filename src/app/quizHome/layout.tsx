import Navbar from "@/components/navbar"

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

 
  return (
    <html lang="en">
      
      <body suppressHydrationWarning={true}>

      <Navbar/>
          
        {children}
    
        </body>
    </html>
  )
}
