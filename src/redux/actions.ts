import axios from "axios"
export const CHANGE_PROFILE = 'CHANGE_PROFILE'
export const DEPLOY_LOG_WND = 'DEPLOY_LOG_WND'
export const LOGOUT = 'LOGOUT'

interface User {
    accessToken: string, 
    name: string,
    pic: string,
    email: string,
    isBusiness: boolean,
}
interface UserStorange {
    accessToken: string, 
    name: string,
    pic: string
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
        const userDb = await axios.get('http://localhost:3002/loginUser?email='+googleUser.email)
        console.log(userDb)
        const user: UserStorange = {
            accessToken: googleUser.accessToken, 
            name: googleUser.name,
            pic: googleUser.pic
        }
        localStorage.setItem('user', JSON.stringify(user)); 

        if(userDb) {
            history.push("/home")
        }else{
            axios.post('http://localhost:3002/loginUser', {isBusiness: null, name: googleUser.name, email: googleUser.email}) 
            dispatch({type: DEPLOY_LOG_WND, payload: true})
        } 
    }   
}
export function deployLogWnd(){
    
    return (dispatch) => {
        dispatch({type: DEPLOY_LOG_WND, payload: true})
    }   
}
export function Logout(history){
    localStorage.clear()
    history.push('/logs')
    return (dispatch) => {
        dispatch({type: LOGOUT, payload: null})
    } 
}