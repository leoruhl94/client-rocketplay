import React, { createContext, useState } from "react";

export const AuthContext = createContext<AuthContextI | null>(null);

interface AuthContextI {
    user?:User, 
    isLogged?:any,
    login?:any,
    logout?:any
  }
interface User {
    mail?:String, 
    name?:String,
    pic?:String
  }

function AuthProvider({children}) {
    const [user, setUser] = useState<User | null>()

     const contextValue:any = {
        user,
        login(user){
            setUser(user)
        },
        logout(){
            setUser(null)
        },
        isLogged(){
            return !!user
        }
    } 
    return <AuthContext.Provider value={contextValue}>
        {children}
    </AuthContext.Provider>
}


export default AuthProvider