
import React from "react";
import "./loginSwitch.scss"
import google from "../../images/google.png"
import { NavigationMobile } from "../../containers/NavigationMobile/NavigationMobile";
import avatar from "../../images/avatar.png"
import { Link } from "react-router-dom";
export const RegisterSwitch: React.FC = () => {
    return (
        <div className="loginSwitchContainer">
            <div className="loginImgContainer">
                <img className="loginImg" src={avatar} alt="Placeholder" />
            </div>
            <div className="buttonsContainer">
                <div className="singleButton">
                    <button className="loginGoogle">Sign Up with Google 
                        <img className="logoGoogle" src={google} alt="google" />
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