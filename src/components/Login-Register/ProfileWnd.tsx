import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router" 
import axios from "axios"
import { changeProfile, Logout } from "../../redux/actions"
import {GoogleLogin, GoogleLogout} from 'react-google-login'
import './ProfileWnd.scss'


interface Props {
    dep: boolean
  }
interface User {
    accessToken: string, 
    name: string,
    pic: string,
}
export const ProfileWnd: React.FC<Props> = ({dep}) => {
    const json = localStorage.getItem('user')
    const profile: User = json ? JSON.parse(json) : null
    const history = useHistory()
    const dispatch = useDispatch()
    const profileState = useSelector((state: storeState) => state.profile)

    async function responseGoogle(googleUser){
        const {code} = googleUser
        const tokens = await axios.post('http://localhost:3002/loginUser', {code: code})
        //console.log('data: ',tokens.data)
        localStorage.setItem('tok', JSON.stringify(tokens))
        const data = await axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${tokens.data.data.id_token}`)
        const userGoogle = {
            //accessToken: tokens.data.data.access_token,
            name: data.data.name,
            pic: data.data.picture,
            email: data.data.email, 
        }
        console.log(userGoogle)
        dispatch(changeProfile(googleUser, history))
    }
    
    function errorGoogle(response){
        console.log(response)
    }
    function logout(){
        dispatch(Logout(history))
    }

    return (
        <div className={`profileWnd ${dep ? 'profileWndDep' : ''}`}>
            <div className="profileWnd__user">
                <img src={profileState.pic} className="profileWnd__pic"/>
                <div className="profileWnd__info">
                    <span>{profileState.name}</span>
                    <span>super admin</span>
                </div>
            </div>
            <div className="profileWnd__cambiar">
                <GoogleLogin
                    clientId="1034475859743-iv8aok7263jflskvdkubpuosqp09kfj0.apps.googleusercontent.com"
                    buttonText="Cambiar Cuenta"
                    className="profileWnd__googleBtn"
                    onSuccess={responseGoogle}
                    onFailure={(errorGoogle)}
                    />
            </div>
            <div className="profileWnd__cambiar">
                <GoogleLogout
                    clientId="1034475859743-iv8aok7263jflskvdkubpuosqp09kfj0.apps.googleusercontent.com"
                    buttonText="Logout"
                    className="profileWnd__googleBtn"
                    onLogoutSuccess={logout}
                />
            </div>
        </div>
    )
}