export const CHANGE_PROFILE = 'CHANGE_PROFILE'
export const LOGOUT = 'LOGOUT'

export function changeProfile(profile){
    return (dispatch) => {
        dispatch({type: CHANGE_PROFILE, payload: profile})
    } 
}
export function Logout(){
    return (dispatch) => {
        dispatch({type: LOGOUT, payload: null})
    } 
}