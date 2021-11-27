
import React from "react";
import "./loginSwitch.scss"
import googleLogo from "../../images/google.png"
import { NavigationMobile } from "../../containers/NavigationMobile/NavigationMobile";
import { app } from '../../firebaseConfig'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
//import {google} from 'googleapis'
  
export const RegisterSwitch: React.FC = () => {
    
    function googleLogin(){
        const auth = getAuth(app)
        const provider = new GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/youtube.upload')

        signInWithPopup(auth, provider)
        .then(r => {
            console.log(r)
        })
        .catch(e => {
            console.log(e)
        })
        /* const youtube = google.youtube({ //youtube authentication
            version: 'v3',
            auth: auth
        }) */
    }

    return (
        <div className="loginSwitchContainer">
            <div className="loginImgContainer">
                <img className="loginImg" src="https://lh3.googleusercontent.com/proxy/ZDIUWyMveUGcHCExQh1mRUHVfuGuUOvmQaG3J4ED-Qwy_W-E_c9M-1BdiaSk7lJyoNybjj1gfBJsHvCNBXBx3D_vkdrNQtxLrw-27iuW8xW7rkmCP7Jj3FhBcYnzLE4" alt="Placeholder" />
            </div>
            <div className="buttonsContainer">
                <div className="singleButton">
                    <button onClick={googleLogin} className="loginGoogle">Sign Up with Google 
                        <img className="logoGoogle" src={googleLogo} alt="google" />
                    </button>
                </div>
                <div className="singleButton">
                    <button className="loginEmail">Sign Up via Email</button>
                </div>
            </div>
            <NavigationMobile />
        </div>
    )
}