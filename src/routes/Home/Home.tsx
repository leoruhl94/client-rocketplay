import React from "react";
import { HomeHeader } from "../../components/HomeComponents/HomeHeader/HomeHeader";
import { HomeImages } from "../../components/HomeComponents/HomeImages/HomeImages";
import { HomeButton } from "../../components/HomeComponents/HomeButton/HomeButton";
export const Home: React.FC = () => {

    return (
        <>
            <HomeHeader />
            <HomeImages/>
            <HomeButton/>
        </>
    )
}
