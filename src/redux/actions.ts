import axios from "axios"
export const CHANGE_PROFILE = 'CHANGE_PROFILE'
export const LOGOUT = 'LOGOUT'

interface User {
    accessToken: string, 
    name: string,
    pic: string,
    email: string,
    isBusiness: boolean,
  }
export function changeProfile(googleUser, history){
    console.log('user: ',googleUser)

    const user: User = {
        accessToken: googleUser.accessToken, 
        name: googleUser.profileObj.name,
        pic: googleUser.profileObj.imageUrl,
        email: googleUser.profileObj.email,
        isBusiness: true,
    }
    //axios.post('http://localhost:3002/loginUser', user)
    axios.get('http://localhost:3002/loginUser?email='+user.email)
    .then(r => console.log(r.data.isRegistered))
    
    localStorage.setItem('user', JSON.stringify(user));
    
    history.push("/home")
    
    return (dispatch) => {
        dispatch({type: CHANGE_PROFILE, payload: null})
    } 
}
export function Logout(history){
    localStorage.clear()
    history.push('/logs')
    return (dispatch) => {
        dispatch({type: LOGOUT, payload: null})
    } 
}