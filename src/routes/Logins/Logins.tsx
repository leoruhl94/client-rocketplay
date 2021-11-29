import React, {useState} from "react";
import {useHistory} from 'react-router-dom'
import {GoogleLogin} from 'react-google-login'
import axios from 'axios'

import "./Logins.scss";
import { NavigationMobile } from "../../containers/NavigationMobile/NavigationMobile";

import { Icon } from "../../components/Icon/Icon";
//import { useGoogleLogin } from 'react-google-login'

interface googleScope {
  scope: string;
}
let wnd: any = null
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
  const handleSend = () :void => {
      //history.push("/")
      axios.post('http://localhost:3002/loginUser', {isBusiness: true})
        .then(r => {
            if(r.data.url){
                wnd = window.open(r.data.url, '_blank', 'toolbar=0,location=0,menubar=0')
                console.log(wnd)
            } 
            
        })
  }
  
  function responseGoogle(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log(profile)
    history.push("/home")

    //axios.post('https://localhost:3002/loginUser', profile)
    /* console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); */ // This is null if the 'email' scope is not present.
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
            buttonText={ sign ? "Sign up with google ": "Log in with google "}
            scope='profile email https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.force-ssl'
            className="loginGoogle"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
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
