import React, { createContext, useState } from "react";
import { useDispatch } from "react-redux";
import { refresh } from "../redux/actions";
import axios from 'axios'

export const AuthContext = createContext<AuthContextI | null>(null);

interface AuthContextI {
    user?:User, 
    isLogged?:any,
    login?:any,
    logout?:any
  }
interface User {
    email?:String, 
    name?:String,
    pic?:String
  }

function AuthProvider({children}) {
    const [user, setUser] = useState<User | null>(null)
    const dispatch = useDispatch()
    const itemLocal = localStorage.getItem("tok")
    const itemSession = sessionStorage.getItem("tok")
    let tokens =  itemLocal ? JSON.parse(itemLocal): (itemSession? JSON.parse(itemSession) : null);
    tokens && dispatch(refresh(tokens, true))
    
    axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${tokens.data.data.id_token}`)
    .then(r => {
        const user = {
        name: r.data.name,
        pic: r.data.picture,
        email: r.data.email,
        };
        setUser(user)
        console.log("USER then", user)
    })
    
    console.log("USER ", user)
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