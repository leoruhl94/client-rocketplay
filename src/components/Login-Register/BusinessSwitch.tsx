import React from "react";
import {Link} from "react-router-dom";
import google from "../../images/google.png"
import "./businessSwitch.scss"
export const BusinessSwitch: React.FC = () => {
    return (
        <div>
            <div className="businessTitle">
                <h1>RocketPlay Business</h1>
                <h3>Let's begin</h3>
            </div>
            <div>
                <div className="loginButtonsContainer">
                    <div className="businessButtonDiv">
                        <Link to="/business/login" className="businessLinkButton">
                            <button className="businessSingleButton">Log In with Email</button>
                        </Link>
                    </div>
                    <div className="businessButtonDiv">
                        <button className="businessSingleButton googleButton">Log In with Google
                            <img className="logoGoogle" src={google} alt="google" />
                        </button>
                    </div>
                </div>
                <div className="businessNewUserDiv">
                    <Link to="business/register" className="businessLinkButton">
                        <p className="businessNewUser">¿New User? Sign Up</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}