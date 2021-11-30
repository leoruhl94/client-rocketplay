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
  const dispatch = useDispatch()
  
  const handleSign = () :void => {
    setSign(!sign)
  }
  
  function responseGoogle(googleUser) {
    dispatch(changeProfile(googleUser, history))
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
