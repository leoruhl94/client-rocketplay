import React from "react";
import { HomeHeader } from "../../components/HomeComponents/HomeHeader/HomeHeader";
import { HomeImages } from "../../components/HomeComponents/HomeImages/HomeImages";
import { HomeClients } from "../../components/HomeComponents/HomeClients/HomeClients";
import { SuperButton } from "../../components/Buttons/SuperButton/SuperButton";
import './Home.scss';
export const Home: React.FC = () => {

    return (
        <div className="allContainer">
            <HomeHeader />
            <HomeClients/>
            <HomeImages/>
            <div className="logInButtonContainer">
                 <SuperButton
                    name="boton_home"
                    route="/logs"
                    classes="logInButton"
                    text="Log In / Sign Up"
                />
            </div>
        </div>
    )
}
