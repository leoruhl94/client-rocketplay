
import React from "react";
import "./loginSwitch.scss"
import google from "../../images/google.png"
import { Link } from "react-router-dom";
import { NavigationMobile } from "../../containers/NavigationMobile/NavigationMobile";
import avatar from "../../images/avatar.png"
export const LoginSwitch: React.FC = () => {
    return (
        <div className="loginSwitchContainer">
      
            <div className="loginImgContainer">
                <img className="loginImg" src={avatar} alt="Placeholder" />
            </div>
            <div className="buttonsContainer">
                <div className="singleButton">
                    <button className="loginGoogle">Log In with Google 
                        <img className="logoGoogle" src={google} alt="google" />
                    </button>
                </div>
                <div className="singleButton">
                    <Link to="/loginEmail" className="linkEmail">
                        <button className="loginEmail">Log In via Email</button>
                    </Link>
                </div>
            </div>
            <NavigationMobile/>
        </div>
    )
}