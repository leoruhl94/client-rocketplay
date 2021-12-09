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

export function loginRegister(tokens, keepSession, auth, history) {
  console.log("LOGIN_REGISTER")
    return async (dispatch) => {
         
      if (keepSession) {
        localStorage.setItem("tok", JSON.stringify(tokens));
      } else {
        sessionStorage.setItem("tok", JSON.stringify(tokens));
      }

      //Obtener datos del usuario
      const data = await axios.get(
        `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${tokens.data.data.id_token}`
      );
      const userGoogle = {
        name: data.data.name,
        pic: data.data.picture,
        email: data.data.email,
      };
        
      axios.post(`${URL_BASE}/v2/users`, {
        isBusiness: false,
        name: userGoogle.name,
        email: userGoogle.email,
      }).then(r => console.log(r.data))
      
      auth?.login(userGoogle);

      dispatch({
        type: REFRESH_PROFILE,
        payload: { name: userGoogle.name, pic: userGoogle.pic },
      });
      console.log('here')
      //history.push("/home");
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
