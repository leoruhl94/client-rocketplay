
import React from "react";
import "./loginSwitch.scss"
import googleLogo from "../../images/google.png"
import { NavigationMobile } from "../../containers/NavigationMobile/NavigationMobile";
import avatar from "../../images/avatar.png"
import { Link } from "react-router-dom";
//import { app } from '../../firebaseConfig'
//import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import axios from 'axios'
//import {google} from 'googleapis'
  
export const RegisterSwitch: React.FC = () => {
    
    function googleLogin(){
        let wnd: any = null
        /* const auth = getAuth(app)
        const provider = new GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/youtube.upload')

        signInWithPopup(auth, provider)
        .then(r => {
            //axios.post('localhost:3002/loginUser', r.user)
            axios({
                method: 'post',
                url: 'http://localhost:3002/loginUser',
                headers: {'Content-Type': 'application/json'}, 
                data: {
                    user: r.user
                }
              })
        })
        .catch(e => {
            console.log(e)
        }) */
        axios.post('http://localhost:3002/loginUser', {isBusiness: true})
        .then(r => {
            if(r.data.url) wnd = window.open(r.data.url, '_blank', 'toolbar=0,location=0,menubar=0')
        })
    }

    return (
        <div className="loginSwitchContainer">
            <div className="loginImgContainer">
                <img className="loginImg" src={avatar} alt="Placeholder" />
            </div>
            <div className="buttonsContainer">
                <div className="singleButton">
                    <button onClick={googleLogin} className="loginGoogle">Sign Up with Google 
                        <img className="logoGoogle" src={googleLogo} alt="google" />
                    </button>
                </div>
                <div className="singleButton">
                    <Link to="/registerEmail" className="linkEmail">
                        <button className="loginEmail">Sign Up via Email</button>
                    </Link>
                </div>
            </div>
            <NavigationMobile />
        </div>
    )
}