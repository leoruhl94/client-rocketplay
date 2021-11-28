
import React from "react";
import "./loginEmail.scss"
import icon from "../../images/bg.png"
import { Link } from "react-router-dom";
import { NavigationMobile } from "../../containers/NavigationMobile/NavigationMobile";
// import avatar from "../../images/avatar.png"
export const RegisterEmail: React.FC = () => {
    return (
        <div className="loginEmailContainer">
                <h1 className="loginTitle">Sign Up with Email</h1>
            <div className="formContainer">
                <form>
                    <div className="divInput">
                        <img src={icon} alt="Icon" className="icon" />
                        <input type="text" name="email" id="email" className="inputForm" />
                        <label htmlFor="email" className="labelForm" >Email</label>
                    </div>
                    <div className="divInput">
                        <img src={icon} alt="Icon" className="icon" />
                        <input type="password" name="password" id="password" className="inputForm" />
                        <label htmlFor="password" className="labelForm" >Password</label>
                    </div>
                </form>
            <div className="singleButton">
                <Link to="/verification" className="linkEmail">
                    <button className="loginEmail">Next</button>
                </Link>
            </div>
            </div>
        <NavigationMobile/>
        </div>
    )
}