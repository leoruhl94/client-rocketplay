import React from "react";
import { SingleChannel } from "../../components/ChannelComponents/Channels/SingleChannel";
import { ChannelNotFound } from "../../components/ChannelComponents/ChannelNotFound/ChannelNotFound";
import { NavigationMobile } from "../../containers/NavigationMobile/NavigationMobile";
import "./channels.scss";
import { useSelector } from "react-redux";

export const Channels: React.FC = () => {
    const profile = useSelector((state: storeState) => state.profile)
    console.log(profile.pic)
    return (
        <div>
            <nav className="channelsNav">
                <ul className="channelsNavUl">Channels</ul>
                <ul className="channelsNavUl ">
                    <img className="Profile_image" src={profile.pic}/>
                </ul>
            </nav>
            <ChannelNotFound/>
                <div className="singleChannelSuperContainer">
                    <SingleChannel/>
                    <SingleChannel/>
                    <SingleChannel/>
                </div>
            <NavigationMobile/>
        </div>
    )
}