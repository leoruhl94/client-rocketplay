import React, { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { refresh, refreshProfile } from "../redux/actions";
import axios from "axios";

export const AuthContext = createContext<AuthContextI | null>(null);

interface AuthContextI {
  token: String | null;
  user?: User;
  isLogged?: any;
  login?: any;
  logout?: any;
}
interface User {
  email?: String;
  name?: String;
  pic?: String;
}

function AuthProvider({ children }) {
  const [user, setUser] = useState<User | null>(null);
  const dispatch = useDispatch();
  const itemLocal = localStorage.getItem("tok");
  const itemSession = sessionStorage.getItem("tok");
  let tokens = itemLocal
    ? JSON.parse(itemLocal)
    : itemSession
    ? JSON.parse(itemSession)
    : null;
  //   tokens && dispatch(refresh(tokens, true));
  useEffect(() => {
    tokens && contextValue.login(tokens.data.data.id_token);
  }, []);

  console.log("USER authProv ", user);
  const contextValue: any = {
    user,
    async login(token) {
        let res = await axios.get(
            `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`
        );
        const user = {
            name: res?.data.name,
            pic: res?.data.picture,
            email: res?.data.email,
        };
        setUser(user);
        dispatch(refreshProfile(user));
        return user;
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
