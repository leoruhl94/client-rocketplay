import axios from "axios";
import { URL_BASE } from "../constants/constants";

export const CHANGE_PROFILE = "CHANGE_PROFILE";
export const LOGOUT = "LOGOUT";
export const REFRESH_PROFILE = "REFRESH_PROFILE";
export const PRICING_SELECT = "PRICING_SELECT";
export const GET_PLANS = "GET_PLANS";

interface userDb {
  data: any;
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
export function refresh(user) {
  return (dispatch) => {
    dispatch({ type: REFRESH_PROFILE, payload: { name: user.name, pic: user.pic } });
  };
}
export function createUser(googleUser, isBusiness = false, plan: any = null) {
  return async (dispatch) => {
    const newUser = await axios.post(`${URL_BASE}/users`, {
      isBusiness,
      plan,
      name: googleUser.name,
      email: googleUser.email,
    });
    console.log({ googleUser, isBusiness, plan });
    // dispatch({type: PRICING_SELECT, payload: ''})
    // dispatch({type: CHANGE_LOGSPAGE, payload: 0})
    localStorage.setItem('user', JSON.stringify(googleUser));
    dispatch({
      type: REFRESH_PROFILE,
      payload: { name: googleUser.name, pic: googleUser.pic },
    });
  };
}

export function loginRegister(googleUser, keepSession) {
  console.log("LOGIN_REGISTER")
    return async (dispatch) => {
         
      const newUser = await axios.post(`${URL_BASE}/v2/users`, {
          isBusiness: false,
          name: googleUser.name,
          email: googleUser.email,
      });
      console.log(newUser);

      if (keepSession) {
        localStorage.setItem("user", JSON.stringify(googleUser));
      } else {
        sessionStorage.setItem("user", JSON.stringify(googleUser));
      }
      dispatch({
        type: REFRESH_PROFILE,
        payload: { name: googleUser.name, pic: googleUser.pic },
      });
          
      // dispatch({ type: CHANGE_LOGSPAGE, payload: 1 });
    }
}

// export function changeProfile(googleUser, history, keepSession) {
//     console.log("TODAVIA NO TERMINASTE GIL, AUN SIGO VIVO")
// //   return async (dispatch) => {
//     const userDb: userDb = await axios.get(
//       `${URL_BASE}/users?email=` + googleUser.email
//     );

    // localStorage.setItem(
    //   "keepSession",
    //   JSON.stringify({ keepSession: keepSession })
    // );
    // localStorage.setItem('user', JSON.stringify(googleUser));

    // if (userDb.data.isRegistered) {
    //   console.log(keepSession);
    //   if (keepSession) {
    //     localStorage.setItem("user", JSON.stringify(googleUser));
    //   } else {
    //     sessionStorage.setItem("user", JSON.stringify(googleUser));
    //   }
    // //   dispatch({type: KEEP_SESSION, payload: keepSession})
    // //   dispatch({
    // //     type: REFRESH_PROFILE,
    // //     payload: { name: googleUser.name, pic: googleUser.pic },
    // //   });
    // //   history.push("/home");
    // } else {
    // //   dispatch({type: KEEP_SESSION, payload: keepSession})
    //   const newUser = await axios.post(`${URL_BASE}/users`, {
    //     isBusiness: false,
    //     plan: null,
    //     name: googleUser.name,
    //     email: googleUser.email,
    //   });
    //   console.log(newUser);
    //   dispatch({ type: CHANGE_LOGSPAGE, payload: 1 });
    //   dispatch({
    //     type: REFRESH_PROFILE,
    //     payload: { name: googleUser.name, pic: googleUser.pic },
    //   });
    //   history.push("/login");
    // }
//   };
// }
export function changeLogsPage(page) {
//   return (dispatch) => {
//     // dispatch({ type: CHANGE_LOGSPAGE, payload: page });
//   };
}
export function Logout(history, auth) {
  localStorage.clear();
  auth?.logout()
  history.push("/login");
  return (dispatch) => {
    dispatch({ type: LOGOUT, payload: null });
  };
}
