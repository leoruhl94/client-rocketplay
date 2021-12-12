import React, { useEffect, useState } from "react";
import { SingleChannelAWS } from "../../components/ChannelComponents/Channels/SingleChannelAWS";
import { ChannelNotFound } from "../../components/ChannelComponents/ChannelNotFound/ChannelNotFound";
import { NavigationMobile } from "../../containers/NavigationMobile/NavigationMobile";
import "./channels.scss";
import { NavProfileAndLocation } from "../../containers/NavProfileAndLocation/NavProfileAndLocation";
import { AddChannel } from "../../components/ChannelComponents/AddChannel/AddChannel";
import axios from "axios";
import { URL_BASE } from "../../constants/constants";

interface Channels {
    channelId: number;
    channelName: string;
    isprivate: boolean;
    description: string;
}

export const ChannelsAWS: React.FC = () => {
    
    const [add, setAdd] = useState(false); 
    
    function handleAdd(){
        setAdd(!add);
    }

    const [channelsState, setChannelsState] = useState<Channels[]>([])

    let schemaName2 = "Marcos"

    useEffect(() => {
        axios.get(`${URL_BASE}/channels?schemaName=${schemaName2}`)
        .then(r => {
            let array: any[] = []
            r.data.map(el => {
                let obj = {
                    channelId: el.id,
                    channelName: el.name,
                    isprivate: el.isprivate,
                    description: el.description,
                }
                array.push(obj)
            })
            setChannelsState(array)
        })
    }, [])

    return (
        <div>
            <NavProfileAndLocation/>
            {/* <ChannelNotFound/> */}
            <AddChannel dep={add} handleAdd={handleAdd}/>
                <div className="singleChannelSuperContainer">
                    <div className="singleChannel-outer-div">
                        {
                            channelsState.length > 0 ?
                            channelsState.map(el => {
                                return <SingleChannelAWS channel={el.channelName} key={el.channelId}/>
                            })
                            :
                            <div>There are no channels here yet</div>
                        }
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