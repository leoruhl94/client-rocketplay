import axios from "axios"
import {URL_BASE} from "../constants/constants";

export const CHANGE_PROFILE = 'CHANGE_PROFILE'
export const CHANGE_LOGSPAGE = 'CHANGE_LOGSPAGE'
export const LOGOUT = 'LOGOUT'
export const REFRESH = "REFRESH"
export const PRICING_SELECT = 'PRICING_SELECT'
export const GET_PLANS = 'GET_PLANS'    

interface userDb {
    data: any, 
}
export function getPlans(){
    return async(dispatch) => {
        const data = await axios.get( `${URL_BASE}/plans`)
        let payload = data.data.map(data => {
            return {
                name: data.name, 
                price: data.price, 
                description: data.description, 
                url: data.back_url,
                userLimit: data.userLimit
            }
        })
        dispatch({type: GET_PLANS, payload})
    }
}

export function pricingSelect(value){
    return (dispatch) => {
        dispatch({type: PRICING_SELECT, payload: value})
    }
}
export function refresh(user){
    return (dispatch) => {
        dispatch({type: REFRESH, payload: {name: user.name, pic: user.pic}})
    }
}
export function createUser(googleUser, isBusiness=false, plan: any=null){
    return async (dispatch) => {
        const newUser = await axios.post(`${URL_BASE}/users`, {isBusiness, plan, name: googleUser.name, email: googleUser.email}) 
        console.log({googleUser, isBusiness, plan});
        dispatch({type: PRICING_SELECT, payload: ''})
        dispatch({type: CHANGE_LOGSPAGE, payload: 0})
        dispatch({type: REFRESH, payload: {name: googleUser.name, pic: googleUser.pic}})
    }
}

export function changeProfile(googleUser, history, keepSession){
    return async (dispatch) => {
        const userDb: userDb = await axios.get(`${URL_BASE}/users?email=`+googleUser.email)
        
        localStorage.setItem('keepSession', JSON.stringify({keepSession: keepSession})); 
        localStorage.setItem('user', JSON.stringify(googleUser)); 

        if(userDb.data.isRegistered) {
            
            // dispatch({type: KEEP_SESSION, payload: keepSession})
            dispatch({type: REFRESH, payload: {name: googleUser.name, pic: googleUser.pic}})
            history.push("/home")
        }else{
            // dispatch({type: KEEP_SESSION, payload: keepSession})
            dispatch({type: CHANGE_LOGSPAGE, payload: 1})
            dispatch({type: REFRESH, payload: {name: googleUser.name, pic: googleUser.pic}})
            history.push('/login')
        } 
    }   
}
export function changeLogsPage(page){
    return (dispatch) => {
        dispatch({type: CHANGE_LOGSPAGE, payload: page})
    }   
}
export function Logout(history){
    localStorage.clear()
    history.push('/login')
    return (dispatch) => {
        dispatch({type: LOGOUT, payload: null})
        dispatch({type: CHANGE_LOGSPAGE, payload: 0})
    } 
}