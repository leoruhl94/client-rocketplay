import React, { createContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { refreshProfile } from "../redux/actions";
import axios from "axios";
import { URL_BASE } from "../constants/constants";
import { useHistory } from "react-router";

export const AuthContext = createContext<AuthContextI | null>(null);

interface AuthContextI {
  token: String | null;
  user?: User;
  isLogged?: any;
  login?: any;
  logout?: any;
  refreshInfo?: any;
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
  const history = useHistory();
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
    async login(tokens) {
      try {
        let res = await axios.get(
          `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokens.access_token}`
        );
        /* let res = await axios.get(
          `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`
          ); */
        let userInfo: User = {
          name: res?.data.name,
          pic: res?.data.picture,
          email: res?.data.email,
        };
        dispatch(refreshProfile(userInfo));
        
        const response = await axios.get(`${URL_BASE}/users`, { params: { email: res?.data.email } })
        
        console.log(response)
        
        if(response.data) userInfo = {
          name: res?.data.name,
          pic: res?.data.picture,
          email: res?.data.email,
          workspaces: response?.data.workspaces || null,
          workspacesTitles: response?.data.workspacesTitles || null,
          subscriptions: response?.data.subscriptions.map((s: sub) => {
            return { id: s.id, status: s.status };
          }) || null,
          isBusiness: response?.data.isBusiness,
        };

        setUser(userInfo);
        return userInfo;
        
      } catch (error) {
        this.logout()
        console.log("token invalido");
        console.log(error);
      }
    },
    logout() {
      localStorage.clear();
      sessionStorage.clear();
      setUser(null);
      dispatch(refreshProfile(false));
      history.push('/login')
    },
    isLogged() {
      return !!this.user;
    },
    async refreshInfo() {
      const r = await axios.get(`${URL_BASE}/users`, { params: { email: user?.email } })
      console.log(r)
      const userInfo = {
        name: user?.name,
        pic: user?.pic,
        email: user?.email,
        workspaces: r?.data.workspaces,
        workspacesTitles: r?.data.workspacesTitles,
        subscriptions: r?.data.subscriptions.map((s: sub) => {
          return { id: s.id, status: s.status };
        }),
        isBusiness: r?.data.isBusiness,
      };
      setUser(userInfo)
    },
  };
      
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
