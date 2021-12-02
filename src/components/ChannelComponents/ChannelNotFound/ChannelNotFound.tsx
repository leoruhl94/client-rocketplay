import React from "react";
import "./channelNotFound.scss";

export const ChannelNotFound: React.FC = () => {
    function handleAdd(){

    }
    return (
        <div className="channelsSuperContainer">
            <div className="channels">
                <div className="channelsNotFound">
                    <h3>No channels to show...</h3>
                </div>
                <div className="channelsAddChannel">
                    <h4>Add channel</h4>
                    <button onClick={handleAdd}>+</button>
                </div>
            </div>
        </div>
    )
}