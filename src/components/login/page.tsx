"use client"
  
import{useState, useEffect}from 'react';
import { useRouter } from 'next/navigation';
import { LoginApi,LoginResult } from './action';
import {useAuth } from '../context/AuthContext'

export default function Login(){
    const router=useRouter();
  const { setAccessToken } = useAuth();
    const[error,setError] = useState<string|null>(null);

//    useEffect(()=>{
//     if(accessToken){
//         router.replace('/quizHome')
//     }
//    },[router])

    const handleLogin=async(formData:FormData)=>{
        setError(null)
        try{
           const result:LoginResult=await LoginApi(formData);
           if(result.success){
            localStorage.setItem('accessToken',result.accessToken)
            console.log('accessToken',result.accessToken)
            setAccessToken(result.accessToken)
            router.push('/quizHome')
           }else{
            setError(result.error)
           }
        }
        catch{
            setError("unExpected error was found")
           }


    }
   

   const submit= async(e:React.FormEvent<HTMLFormElement>)=>{
     e.preventDefault()
     const formData=new FormData(e.currentTarget);
     await handleLogin(formData)
   }
    return(
        <div className="  h-screen flex justify-center items-center ">
            <form onSubmit={submit} className="bg-amber-300  rounded-md flex flex-col gap-5  p-10 ">
            <div className="flex flex-col gap-1">
                <label>Username</label>
                 <input 
                 name="username"
                 type="text"
                 className="border rounded-md p-1 outline-none"
                 />
            </div>

            <div className="flex flex-col gap-1">
                <label>Password</label>
                 <input
                 name="password"
                 type="password"
                 className="border rounded-md p-1 outline-none" />
            </div>

               {error && <p className="text-red-500">{error}</p>}
            <div className="self-center">
                 <button className="rounded-md  bg-blue-500 px-5 py-2 text-center text-xl text-white font-bold">Login</button>
            </div>
            </form>
        </div>
    )

}