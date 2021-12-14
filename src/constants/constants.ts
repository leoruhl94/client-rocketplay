import CSS from "csstype";

export const COOKIES_POLICY = "single_host_origin"
export const URL_BASE = "http://localhost:3002";

//export const URL_BASE = "https://api-rocketplay.herokuapp.com";
//export const COOKIES_POLICY = "https://rocketplay.com.ar"
export const CLIENT_ID = "1009538709316-mp0t7rds0snem49ajha6d8u74mbgtb9v.apps.googleusercontent.com"
// constantes de redux

export const CHANGE_PROFILE = 'CHANGE_PROFILE'
export const CHANGE_LOGSPAGE = 'CHANGE_LOGSPAGE'
export const LOGOUT = 'LOGOUT'
export const REFRESH_PROFILE = "REFRESH_PROFILE"
export const PRICING_SELECT = 'PRICING_SELECT'
export const GET_PLANS = 'GET_PLANS' 
export const SAVE_USER = 'SAVE_USER'
export const POST_CATEGORY = 'POST_CATEGORY'
export const TRUNCATE_CATEGORY = 'TRUNCATE_CATEGORY'
export const PUT_CATEGORY = 'PUT_CATEGORY'


// NOTIFICATIONS
export const POST_NOTIFICATIONS = 'POST_NOTIFICATIONS'
export const READ_NOTIFICATIONS = 'READ_NOTIFICATIONS'
export const CHANGE_PAGE = 'CHANGE_PAGE'


export function styleVar(vars: any) {
    const cssVars: CSS.Properties = {};
    if (typeof vars === "object") {
      for (let prop in vars) {
        cssVars["--" + prop] = vars[prop];
      }
    }
    return cssVars;
  }