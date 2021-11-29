export const CHANGE_PROFILE = 'CHANGE_PROFILE'

export function changeProfile(profile){
    return (dispatch) => {
        dispatch({type: CHANGE_PROFILE, payload: profile})
    } 
}