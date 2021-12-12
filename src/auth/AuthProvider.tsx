import React, { createContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { refreshProfile } from "../redux/actions";
import axios from "axios";
import { URL_BASE } from "../constants/constants";

export const AuthContext = createContext<AuthContextI | null>(null);

interface AuthContextI {
  token: String | null;
  user?: User;
  isLogged?: any;
  login?: any;
  logout?: any;
}
interface sub {
  id?: string;
  status?: string;
}
interface User {
  email?: String;
  name?: String;
  pic?: String;
  workspaces?: string[] | null;
  workspacesTitles?: string[] | null;
  subscriptions?: sub[];
  isBusiness?: Boolean;
}

function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null);
  const dispatch = useDispatch();
  /* const itemLocal = localStorage.getItem("tok");
  const itemSession = sessionStorage.getItem("tok");
  let tokens = itemLocal
    ? JSON.parse(itemLocal)
    : itemSession
    ? JSON.parse(itemSession)
    : null;
    //   tokens && dispatch(refresh(tokens, true));
  useEffect(() => {
    //tokens && contextValue.login(tokens.data.data.id_token);
  }, []); */
  
  // console.log("USER authProv ", user);
  const contextValue: any = {
    user,
    async login(token) {
      // console.log("ENTRE LOGIN AUTH ", token)

      try {
        let res = await axios.get(
          `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`
          );
          // const dbUserInfo = await axios.get(`${URL_BASE}/users`, {params:{email:res?.data.email}})
          // const user = {
            //   name: res?.data.name,
            //   pic: res?.data.picture,
            //   email: res?.data.email,
            //   workspaces: dbUserInfo?.data.workspaces,
            //   subscriptions: dbUserInfo?.data.subscriptions.map((s:sub) => {return {id: s.id, status: s.status}}),
            //   isBusiness: dbUserInfo?.data.isBusiness
            // };
            const user = {
              name: res?.data.name,
              pic: res?.data.picture,
              email: res?.data.email,
            };
            axios
            .get(`${URL_BASE}/users`, { params: { email: res?.data.email } })
            .then((response)=>{
              const user = {
                name: res?.data.name,
                pic: res?.data.picture,
                email: res?.data.email,
                workspaces: response?.data.workspaces,
                workspacesTitles: response?.data.workspacesTitles,
                subscriptions: response?.data.subscriptions.map((s: sub) => {
                  return { id: s.id, status: s.status };
                }),
                isBusiness: response?.data.isBusiness,
              };
              setUser(user);
              dispatch(refreshProfile(user));
            });
            setUser(user);
            dispatch(refreshProfile(user));
            return user;
          } catch (error) {
            console.log("token invalido");
            console.log(error);
          }
        },
        logout() {
          setUser(null);
        },
        isLogged() {
          return !!this.user;
        },
      };
      
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
