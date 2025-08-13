'use client'
import {createContext, useContext, useState} from 'react';

type AuthToken={
    accessToken:string|null,
    setAccessToken:(token:string|null)=>void
    
}

const AuthContext= createContext<AuthToken>({
    accessToken:null,
    setAccessToken:()=>{}
})

export function AuthProvider({children,initialToken}:{children:React.ReactNode, initialToken:string|null}){
   const [accessToken, setAccessToken]=useState(initialToken);

   return(
    <AuthContext.Provider value={{ accessToken, setAccessToken}}>
      {children}
    </AuthContext.Provider>
   )
}

export const useAuth= () =>useContext(AuthContext);