import axios from "axios";
import { URL_BASE } from "../constants/constants";

export const CHANGE_PROFILE = "CHANGE_PROFILE";
export const LOGOUT = "LOGOUT";
export const REFRESH_PROFILE = "REFRESH_PROFILE";
export const PRICING_SELECT = "PRICING_SELECT";
export const GET_PLANS = "GET_PLANS";

interface User {
  email?:String, 
  name?:String,
  pic?:String
}
interface AuthContextI {
  user?:User, 
  isLogged?:any,
  login?:any,
  logout?:any
}
export function getPlans() {
  return async (dispatch) => {
    const data = await axios.get(`${URL_BASE}/plans`);
    let payload = data.data.map((data) => {
      return {
        name: data.name,
        price: data.price,
        description: data.description,
        url: data.link_checkout,
        userLimit: data.userLimit,
      };
    });
    dispatch({ type: GET_PLANS, payload });
  };
}

export function pricingSelect(value) {
  return (dispatch) => {
    dispatch({ type: PRICING_SELECT, payload: value });
  };
}

export function refresh(info, tok=false) {
  return async (dispatch) => {
    let user = info;
    if(tok){
      const data = await axios.get(
        `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${info.data.data.id_token}`
      );
      const userGoogle = {
        name: data.data.name,
        pic: data.data.picture,
        email: data.data.email,
      };
      user = userGoogle
    }
    dispatch({ type: REFRESH_PROFILE, payload: { name: user.name, pic: user.pic } });
  };
}

export function loginRegister(tokens, keepSession, auth) {
    return async (dispatch) => {
         
      if (keepSession) {
        localStorage.setItem("tok", JSON.stringify(tokens));
      } else {
        sessionStorage.setItem("tok", JSON.stringify(tokens));
      }
      const user = await auth?.login(tokens.data.data.id_token);
     
      axios.post(`${URL_BASE}/users`, {
        isBusiness: false,
        name: user.name,
        email: user.email,
      })
    }
}
export function refreshProfile(user) {
    return {
      type: REFRESH_PROFILE,
      payload: { name: user.name, pic: user.pic },
    }
}


export function Logout(history, auth) {
  localStorage.clear();
  sessionStorage.clear();
  auth?.logout()
  history.push("/login");
  return (dispatch) => {
    dispatch({ type: LOGOUT, payload: null });
  };
}
