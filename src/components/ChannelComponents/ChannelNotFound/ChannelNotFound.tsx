import React from "react";
import "./channelNotFound.scss";

export const ChannelNotFound: React.FC = () => {
    return (
        <div className="channelsSuperContainer">
            <div className="channels">
                <div className="channelsNotFound">
                    <h3>No channels to show...</h3>
                </div>
                <div className="channelsAddChannel">
                    <h4>Add channel</h4>
                    <button>+</button>
                </div>
            </div>
        </div>
    )
}