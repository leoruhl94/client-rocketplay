import React, { useState } from "react";
import "./channelNotFound.scss";
import { AddChannel } from "../AddChannel/AddChannel";

export const ChannelNotFound: React.FC = () => {

    const [add, setAdd] = useState(false); 
    
    function handleAdd(){
        setAdd(!add);
    }

    return (
        <div className="channelsSuperContainer">
            <AddChannel dep={add} handleAdd={handleAdd}/>
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