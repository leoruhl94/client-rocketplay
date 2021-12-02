import axios from "axios"
export const CHANGE_PROFILE = 'CHANGE_PROFILE'
export const CHANGE_LOGSPAGE = 'CHANGE_LOGSPAGE'
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
export function refresh(user){
    return (dispatch) => {
        dispatch({type: REFRESH, payload: {name: user.name, pic: user.pic}})
    }
}

export function changeProfile(googleUser, history){
    return async (dispatch) => {
        const userDb: userDb = await axios.get('http://localhost:3002/users?email='+googleUser.email)
        console.log(userDb)

        localStorage.setItem('user', JSON.stringify(googleUser)); 

        if(userDb.data.isRegistered) {
            console.log('here')
            dispatch({type: REFRESH, payload: {name: googleUser.name, pic: googleUser.pic}})
            history.push("/home")
        }else{
            const newUser = await axios.post('http://localhost:3002/users', {isBusiness: false, name: googleUser.name, email: googleUser.email}) 
            console.log(newUser)
            dispatch({type: CHANGE_LOGSPAGE, payload: 1})
            dispatch({type: REFRESH, payload: {name: googleUser.name, pic: googleUser.pic}})
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
    history.push('/logs')
    return (dispatch) => {
        dispatch({type: LOGOUT, payload: null})
        dispatch({type: CHANGE_LOGSPAGE, payload: 0})
    } 
}