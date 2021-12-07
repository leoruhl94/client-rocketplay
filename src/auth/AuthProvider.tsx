import React, { createContext, useState } from "react";

export const AuthContext = createContext<AuthContextI>({});

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
    const [user, setUser] = useState<User | undefined>()

     const contextValue:any = {
        user,
        login(){
            setUser({ name:"franco", mail:"franco@algo.com", pic: 'fotaza'})
        },
        logout(){
            setUser(undefined)
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