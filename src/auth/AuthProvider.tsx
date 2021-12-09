import React, { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refresh } from "../redux/actions";
import axios from 'axios'
import { storeState } from "src/redux/type";
import { useAuth } from "./useAuth";

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
    const dispatch = useDispatch()
    const itemLocal = localStorage.getItem("tok")
    const itemSession = sessionStorage.getItem("tok")
    let tokens =  itemLocal ? JSON.parse(itemLocal): (itemSession? JSON.parse(itemSession) : null);
    tokens && dispatch(refresh(tokens, true));
    
    useEffect(() => {
        tokens && axios.get(
            `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${tokens?.data.data.id_token}`
        )
        .then(r => {
            const userGoogle = {
                name: r.data.name,
                pic: r.data.picture,
                email: r.data.email,
            };
            setUser(userGoogle)
        })
    }, [])
    /* axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${tokens.data.data.id_token}`)
    .then(r => {
        const user = {
            name: r.data.name,
            pic: r.data.picture,
            email: r.data.email,
        };
        //setUser(user)
        console.log("USER then", user)
    }) */
    
    const [user, setUser] = useState<User | null>(tokens)
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