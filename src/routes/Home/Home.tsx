import React from "react";
import { HomeHeader } from "../../components/HomeComponents/HomeHeader/HomeHeader";
import { HomeImages } from "../../components/HomeComponents/HomeImages/HomeImages";
import { HomeButton } from "../../components/HomeComponents/HomeButton/HomeButton";
import { HomeClients } from "../../components/HomeComponents/HomeClients/HomeClients";
export const Home: React.FC = () => {

    return (
        <div className="allContainer">
            <HomeHeader />
            <HomeClients/>
            <HomeImages/>
            <HomeButton/>
        </div>
    )
}
