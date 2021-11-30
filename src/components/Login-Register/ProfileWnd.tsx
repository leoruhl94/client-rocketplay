import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { useHistory } from "react-router" 
import axios from "axios"
import { changeProfile, Logout } from "../../redux/actions"
import {GoogleLogin, GoogleLogout} from 'react-google-login'
import './ProfileWnd.scss'

interface User {
    accessToken: '', 
    name: '',
    pic: ''
  }
interface Props {
    dep: boolean
  }

export const ProfileWnd: React.FC<Props> = ({dep}) => {
    const json = localStorage.getItem('user')
    const profile: User = json ? JSON.parse(json) : null
    const history = useHistory()

    function responseGoogle(googleUser){
        
        const user: User = {
            accessToken: googleUser.accessToken, 
            name: googleUser.profileObj.name,
            pic: googleUser.profileObj.imageUrl
          }
          axios.post('http://localhost:3002/loginUser', {isBusiness: true, name: googleUser.profileObj.name, email: googleUser.profileObj.email})
          
          localStorage.setItem('user', JSON.stringify(user));
    }
    
    function errorGoogle(response){
        console.log(response)
    }
    function logout(){
        localStorage.clear()
        history.push('/logs')
    }

    return (
        <div className={`profileWnd ${dep ? 'profileWndDep' : ''}`}>
            <div className="profileWnd__user">
                <img src={profile.pic} className="profileWnd__pic"/>
                <div className="profileWnd__info">
                    <span>{profile.name}</span>
                    <span>super admin</span>
                </div>
            </div>
            <div className="profileWnd__cambiar">
                <GoogleLogin
                    clientId="1009538709316-mp0t7rds0snem49ajha6d8u74mbgtb9v.apps.googleusercontent.com"
                    buttonText="Cambiar Cuenta"
                    className="profileWnd__googleBtn"
                    onSuccess={responseGoogle}
                    onFailure={(errorGoogle)}
                    />
            </div>
            <div className="profileWnd__cambiar">
                <GoogleLogout
                    clientId="1009538709316-mp0t7rds0snem49ajha6d8u74mbgtb9v.apps.googleusercontent.com"
                    buttonText="Logout"
                    className="profileWnd__googleBtn"
                    onLogoutSuccess={logout}
                />
            </div>
        </div>
    )
}