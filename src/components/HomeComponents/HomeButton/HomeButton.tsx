import React from "react";
import "./homeButton.scss"

export const HomeButton: React.FC = () => {
    return (
        <>
            <div className="logInButtonContainer">
                <button className="logInButton">
                    Log In / Sign Up
                </button>
            </div>
        </>
    )
}