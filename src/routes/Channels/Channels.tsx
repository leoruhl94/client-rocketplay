import React, { useEffect, useState } from "react";
import { SingleChannel } from "../../components/ChannelComponents/Channels/SingleChannel";
import { ChannelNotFound } from "../../components/ChannelComponents/ChannelNotFound/ChannelNotFound";
import { NavigationMobile } from "../../containers/NavigationMobile/NavigationMobile";
import "./channels.scss";
import { useSelector } from "react-redux";
import { ProfileWnd } from "../../components/Login-Register/ProfileWnd";
import { NavProfileAndLocation } from "../../containers/NavProfileAndLocation/NavProfileAndLocation";
import { Link } from "react-router-dom";

export const Channels: React.FC = () => {
    
    // useEffect(()=> {localStorage.setItem('lastRoute', '/home')}, [])

    return (
        <div>
            <NavProfileAndLocation/>
            {/* <ChannelNotFound/> */}
                <div className="singleChannelSuperContainer">
                    <SingleChannel channel='canal 1'/>
                    <SingleChannel channel='canal 1'/>

                    <SingleChannel channel='canal 2'/>
                    <SingleChannel channel='canal 3'/>
                    <Link to="/createVids">
                    <button >Crear un video</button>
                    </Link>
                </div>
            <NavigationMobile back='home'/>
        </div>
    )
}