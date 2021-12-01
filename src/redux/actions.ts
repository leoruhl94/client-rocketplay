import axios from "axios"
export const CHANGE_PROFILE = 'CHANGE_PROFILE'
export const DEPLOY_LOG_WND = 'DEPLOY_LOG_WND'
export const LOGOUT = 'LOGOUT'
export const REFRESH = "REFRESH"

interface User {
    accessToken: string, 
    name: string,
    pic: string,
    email: string,
    isBusiness: boolean,
}
interface userDb {
    data: any, 
}
/* export function changeProfile(googleUser, history){
    const user: User = {
        accessToken: googleUser.accessToken, 
        name: googleUser.profileObj.name,
        pic: googleUser.profileObj.imageUrl,
        email: googleUser.profileObj.email,
        isBusiness: true,
    }
    localStorage.setItem('user', JSON.stringify({user}));
    //axios.post('http://localhost:3002/loginUser', user)
    return (dispatch) => {
        dispatch({type: CHANGE_PROFILE, payload: false})
    }   
} */


export function changeProfile(googleUser, history){
    return async (dispatch) => {
        const userDb: userDb = await axios.get('http://localhost:3002/users?email='+googleUser.email)
        console.log(userDb)

        localStorage.setItem('user', JSON.stringify(googleUser)); 

        if(userDb.data.isRegistered) {
            dispatch({type: REFRESH, payload: {name: googleUser.name, pic: googleUser.pic}})
            history.push("/home")
        }else{
            const newUser = await axios.post('http://localhost:3002/users', {isBusiness: false, name: googleUser.name, email: googleUser.email}) 
            console.log(newUser)
            dispatch({type: DEPLOY_LOG_WND, payload: true})
        } 
    }   
}
export function closeAccountType(){
    return (dispatch) => {
        dispatch({type: DEPLOY_LOG_WND, payload: false})
    }   
}
export function Logout(history){
    localStorage.clear()
    history.push('/logs')
    return (dispatch) => {
        dispatch({type: LOGOUT, payload: null})
    } 
}