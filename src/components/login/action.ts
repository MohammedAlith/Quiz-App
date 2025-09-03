
"use server"
import { cookies } from "next/headers";

 export type LoginResult =
  | { success: true; accessToken: string }
  | { success: false; error: string };

export async function LoginApi(formData : FormData):Promise<LoginResult>{
const username = formData.get('username')?.toString()||"";
const password= formData.get('password')?.toString()||"";

const response= await fetch('https://dummyjson.com/auth/login', {
    method : "POST",
    body : JSON.stringify({username, password}),
    headers:{'content-Type':'application/json'}
})
    
const data=await response.json();
console.log(data);

if(data.accessToken){
const cookie= await cookies();
 cookie.set({
    name:'accessToken',
    value:data.accessToken,
    
     maxAge:5*60

   })

 return {success:true, accessToken: data.accessToken}
}

return {success:false,error:'Invalid username and password'}
  
}