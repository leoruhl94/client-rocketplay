import React from "react";
import "./homeButton.scss"
import {Link} from "react-router-dom";
export const HomeButton: React.FC = () => {
    return (
        <>
            <div className="logInButtonContainer">
                <Link to="/logs" className="link">
                <button className="logInButton">
                    Log In / Sign Up
                </button>
                </Link>
            </div>
            <div className="logInButtonContainer2">
                <Link to="/logs" className="link">
                <button className="logInButton">
                    Log In / Sign Up
                </button>
                </Link>
            </div>
        </>
    )
}