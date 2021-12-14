import axios from "axios";
import {
  URL_BASE,
  CHANGE_PROFILE,
  LOGOUT,
  REFRESH_PROFILE,
  PRICING_SELECT,
  GET_PLANS,
  POST_CATEGORY,
  TRUNCATE_CATEGORY,
  PUT_CATEGORY,
  POST_NOTIFICATIONS,
  READ_NOTIFICATIONS,
  CHANGE_PAGE,
  SET_TOAST,
} from "../constants/constants";


interface User {
  email?: String;
  name?: String;
  pic?: String;
}
interface AuthContextI {
  user?: User;
  isLogged?: any;
  login?: any;
  logout?: any;
}
export function getPlans() {
  return async (dispatch) => {
    const data = await axios.get(`${URL_BASE}/plans`);
    //const data = await axios.get(`https://api-rocketplay.herokuapp.com/plans`);
    let payload = data.data.map((data) => {
      return {
        name: data?.name,
        price: data?.price,
        description: data?.description,
        url: data?.link_checkout,
        userLimit: data?.userLimit,
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

export function refresh(info, tok = false) {
  return async (dispatch) => {
    let user = info;
    if (tok) {
      const data = await axios.get(
        `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${info.data.data.id_token}`
      );
      const userGoogle = {
        name: data.data.name,
        pic: data.data.picture,
        email: data.data.email,
      };
      user = userGoogle;
    }
    dispatch({
      type: REFRESH_PROFILE,
      payload: { name: user.name, pic: user.pic },
    });
  };
}

export function loginRegister(tokens, keepSession, auth) {
  return async (dispatch) => {
    if (keepSession) {
      localStorage.setItem("tok", JSON.stringify(tokens));
    } else {
      sessionStorage.setItem("tok", JSON.stringify(tokens));
    }
    const user = await auth?.login(tokens.data.data);

    axios.post(`${URL_BASE}/users`, {
      isBusiness: false,
      name: user.name,
      email: user.email,
    });
  };
}
export function refreshProfile(user) {
  return {
    type: REFRESH_PROFILE,
    payload: user ? { name: user.name, pic: user.pic } : null,
  };
}

export function Logout(history, auth) {
  localStorage.clear();
  sessionStorage.clear();
  auth?.logout();
  history.push("/login");
  return (dispatch) => {
    dispatch({ type: LOGOUT, payload: null });
  };
}

// Complete: Puedo agregar categorías
export function postCategory(data) {
  async function postInBack() {
    // TODO: Mandarlo al backEnd
    // const categoryData = await axios.post()
  }

  let obj = {
    title: data,
    videos: 0,
  };

  return (dispatch) => {
    dispatch({ type: POST_CATEGORY, payload: obj });
  };
}

// Complete: Debe eliminar categorías
export function truncateCategory(data) {
  async function postInBack() {
    // TODO: Mandarlo al backEnd
    // const categoryData = await axios.post()
  }

  // Le pasamos el nombre completo para hacer un filter
  return (dispatch) => {
    dispatch({ type: TRUNCATE_CATEGORY, payload: data });
  };
}

// Complete: Debe actualizar categorías
export function putCategory(data, newData) {
  async function postInBack() {
    // TODO: Mandarlo al backEnd
    // A la ruta del backEnd -> nombreSchema, oldTitle, newTitle
    // const categoryData = await axios.post()
  }

  // Se va para el reducer
  let obj = {
    title: data,
    newTitle: newData,
  };

  // Le pasamos el nombre completo para hacer un filter
  return (dispatch) => {
    dispatch({ type: PUT_CATEGORY, payload: obj });
  };
}


//Notifications

export function postNotifications(data){

  return (dispatch) => {
    dispatch({ type: POST_NOTIFICATIONS, payload : {...data, readed: false} })
  }
}
export function readNotifications(){

  return (dispatch) => {
    dispatch({ type: READ_NOTIFICATIONS, payload : false })
  }
}
export function changePage(n){
  return (dispatch) => {
    dispatch({ type: CHANGE_PAGE, payload: n });
  };
}

export function setToast(data){
  return (dispatch) => {
    dispatch({ type: SET_TOAST, payload: data})
  }
}