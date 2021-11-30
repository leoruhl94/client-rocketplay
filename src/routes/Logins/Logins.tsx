import React, {useState} from "react";
import {useHistory, useLocation} from 'react-router-dom'
import {GoogleLogin} from 'react-google-login'
import axios from 'axios'
import { useDispatch } from "react-redux";
import "./Logins.scss";
import {changeProfile} from '../../redux/actions'
import { NavigationMobile } from "../../containers/NavigationMobile/NavigationMobile";

import { Icon } from "../../components/Icon/Icon";
//import { useGoogleLogin } from 'react-google-login'

interface User {
  accessToken: string, 
  name: string,
  pic: string,
  email: string,
  isBusiness: boolean,
}
//let wnd: any = null
export const Logins: React.FC = () => {
  const [sign, setSign] = useState<boolean>(false);
  const history = useHistory();
  
  /* const { signIn, loaded } = useGoogleLogin({
      scope: 'https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.force-ssl',
      clientId:
    }) */
  
  const handleSign = () :void => {
    setSign(!sign)
  }
  // const handleSend = () :void => {
  //     //history.push("/")
  //     axios.post('http://localhost:3002/loginUser', {isBusiness: true})
  //       .then(r => {
  //           if(r.data.url){
  //               wnd = window.open(r.data.url, '_blank', 'toolbar=0,location=0,menubar=0')
  //               console.log(wnd)
  //           } 
            
  //       })
  // }
  
  function responseGoogle(googleUser) {
    // var profile = googleUser.getBasicProfile();
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
    .then(r => console.log(r))
    
    localStorage.setItem('user', JSON.stringify(user));
    
    history.push("/home")
  }

  function errorGoogle(response){
    console.log(response)
  }

  return (
    <div>
      <div className="Logs">
        <h2 className="Logs_title">{`${sign ?'Sign up':'Log in'} to start using our service`}</h2>

        <div className="Logs_logo">
          <Icon svg="logoDarkColor" />
        </div>      
        <div className="singleButton">
          <GoogleLogin
            clientId="1009538709316-mp0t7rds0snem49ajha6d8u74mbgtb9v.apps.googleusercontent.com"
            buttonText={ sign ? "Sign up with Google ": "Log in with Google "}
            scope='profile email https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.force-ssl'
            className="botoncito"
            onSuccess={responseGoogle}
            onFailure={(errorGoogle)}
            cookiePolicy={'single_host_origin'}
          />
        </div>
        <button className="Logins__toggle-botton" onClick={handleSign}>
        { sign ? "Already have an account? Log in": "Don’t have an account? Sign up"}
        </button>



        <NavigationMobile />
      </div>
    </div>
  );
};
