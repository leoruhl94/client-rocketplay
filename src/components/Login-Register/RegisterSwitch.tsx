
import React from "react";
import "./loginSwitch.scss"
import google from "../../images/google.png"
import { NavigationMobile } from "../../containers/NavigationMobile/NavigationMobile";
export const RegisterSwitch: React.FC = () => {
    return (
        <div className="loginSwitchContainer">
            <div className="loginImgContainer">
                <img className="loginImg" src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png" alt="Placeholder" />
            </div>
            <div className="buttonsContainer">
                <div className="singleButton">
                    <button className="loginGoogle">Sign Up with Google 
                        <img className="logoGoogle" src={google} alt="google" />
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