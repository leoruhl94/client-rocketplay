import React from "react";
import "./singleChannel.scss"

export const SingleChannel: React.FC = () => {
    return (
        <div className="singleChannelDiv">
            <div className="singleChannelIcon">
                <img src="nothing" alt="PPP" />
            </div>
            <div className="singleChannelText">
                <h2>Channel X</h2>
            </div>
            <div className="singleChannelArrow">
                <p>{">"}</p>
            </div>
        </div>
    )
}