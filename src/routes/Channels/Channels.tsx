import React from "react";
import { SingleChannel } from "../../components/ChannelComponents/Channels/SingleChannel";
import { ChannelNotFound } from "../../components/ChannelComponents/ChannelNotFound/ChannelNotFound";
import { NavigationMobile } from "../../containers/NavigationMobile/NavigationMobile";
import "./channels.scss";

export const Channels: React.FC = () => {
    return (
        <div>
            <nav className="channelsNav">
                <ul className="channelsNavUl">Channels</ul>
                <ul className="channelsNavUl channelsNavF">F</ul>
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