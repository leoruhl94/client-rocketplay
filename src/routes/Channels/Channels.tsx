import React, { useEffect, useState } from "react";
import { SingleChannel } from "../../components/ChannelComponents/Channels/SingleChannel";
import { ChannelNotFound } from "../../components/ChannelComponents/ChannelNotFound/ChannelNotFound";
import { NavigationMobile } from "../../containers/NavigationMobile/NavigationMobile";
import "./channels.scss";
import { useSelector } from "react-redux";
import { ProfileWnd } from "../../components/Login-Register/ProfileWnd";

interface User {
    accessToken: '', 
    name: '',
    pic: ''
  }
export const Channels: React.FC = () => {
    const json = localStorage.getItem('user')
    const profile: User = json ? JSON.parse(json) : null
    const [wndProfile, setWndProfile] = useState(false)
    useEffect(()=> {localStorage.setItem('lastRoute', '/home')}, [])
    return (
        <div>
            <nav className="channelsNav">
                <ul className="channelsNavUl">Channels</ul>
                <ul className="channelsNavUl ">
                    <button className="channelsNavProfileBtn" onClick={()=>{setWndProfile(!wndProfile)}}>
                        <img className="Profile_image" src={profile.pic}/>
                    </button>
                    <ProfileWnd dep={wndProfile}/>
                </ul>
            </nav>
            <ChannelNotFound/>
                <div className="singleChannelSuperContainer">
                    <SingleChannel channel='canal 1'/>
                    <SingleChannel channel='canal 2'/>
                    <SingleChannel channel='canal 3'/>
                </div>
            <NavigationMobile back='home'/>
        </div>
    )
}