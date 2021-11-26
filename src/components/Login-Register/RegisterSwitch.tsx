import { BackButton } from "../BackButton/BackButton";
import React from "react";
import "./loginSwitch.scss"
import google from "../../images/google.png"

export const RegisterSwitch: React.FC = () => {
    return (
        <div>
            <BackButton/>
            <div className="loginImgContainer">
                <img className="loginImg" src="https://lh3.googleusercontent.com/proxy/ZDIUWyMveUGcHCExQh1mRUHVfuGuUOvmQaG3J4ED-Qwy_W-E_c9M-1BdiaSk7lJyoNybjj1gfBJsHvCNBXBx3D_vkdrNQtxLrw-27iuW8xW7rkmCP7Jj3FhBcYnzLE4" alt="Placeholder" />
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
        </div>
    )
}