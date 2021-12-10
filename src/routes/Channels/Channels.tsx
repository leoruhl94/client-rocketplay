import React, { useEffect, useState } from "react";
import { SingleChannel } from "../../components/ChannelComponents/Channels/SingleChannel";
import { ChannelNotFound } from "../../components/ChannelComponents/ChannelNotFound/ChannelNotFound";
import { NavigationMobile } from "../../containers/NavigationMobile/NavigationMobile";
import "./channels.scss";
import { useSelector } from "react-redux";
import { ProfileWnd } from "../../routes/Logins/Login-Register/ProfileWnd";
import { NavProfileAndLocation } from "../../containers/NavProfileAndLocation/NavProfileAndLocation";
import { Link } from "react-router-dom";
import { AddChannel } from "../../components/ChannelComponents/AddChannel/AddChannel";

export const Channels: React.FC = () => {
    
    // useEffect(()=> {localStorage.setItem('lastRoute', '/home')}, [])

    const [add, setAdd] = useState(false); 
    
    function handleAdd(){
        setAdd(!add);
    }

    return (
        <div>
            <NavProfileAndLocation/>
            {/* <ChannelNotFound/> */}
            <AddChannel dep={add} handleAdd={handleAdd}/>
                <div className="singleChannelSuperContainer">
                    <div className="singleChannel-outer-div">
                        <SingleChannel channel='Channel 1'/>
                        <SingleChannel channel='Channel 2'/>
                        <SingleChannel channel='Channel 3'/>
                        <SingleChannel channel='Channel 4'/>
                        <div className="channelsAddChannel2">
                            <h4>Add channel</h4>
                            <button onClick={handleAdd}>+</button>
                        </div>
                    </div>
                    {/* <Link to="/createVids">
                    <button >Crear un video</button>
                    </Link> */}
                </div>
            <NavigationMobile back='home'/>
        </div>
    )
}