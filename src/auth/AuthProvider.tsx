import React, { createContext, useState } from "react";
import { useDispatch } from "react-redux";
import { refresh } from "../redux/actions";

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
    const itemLocal = localStorage.getItem("user")
    const itemSession = sessionStorage.getItem("user")
    let userFinal =  itemLocal ? JSON.parse(itemLocal): (itemSession? JSON.parse(itemSession) : null);
    userFinal && dispatch(refresh(userFinal))
    
    // const js = localStorage.getItem("user")
    // const userLocal = js && JSON.parse(js)
    // const js2 = sessionStorage.getItem("user")
    // const userSession = js && JSON.parse(js)
    // let storage = null
    // if(js) {
    //     storage = userLocal
    //     dispatch(refresh(storage))
    // } else if(js2) {
    //     storage = userSession
    //     dispatch(refresh(storage))
    // }
    // const [user, setUser] = useState<User | null>(storage ? storage : null)
    const [user, setUser] = useState<User | null>(userFinal)

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