import React, { useEffect, useState } from "react";
import { SingleChannelAWS } from "../../components/ChannelComponents/Channels/SingleChannelAWS";

import "./channels.scss";
import { NavProfileAndLocation } from "../../containers/NavProfileAndLocation/NavProfileAndLocation";
// import { AddChannel } from "../../components/ChannelComponents/AddChannel/AddChannel";
import axios from "axios";
import { URL_BASE } from "../../constants/constants";
import {useParams} from "react-router";

interface Channels {
    channelId: number;
    channelName: string;
    isprivate: boolean;
    description: string;
}

export const ChannelsAWS: React.FC = () => {
    
    let params: any = useParams()

    const [add, setAdd] = useState(false); 
    
    function handleAdd(){
        setAdd(!add);
    }

    const [channelsState, setChannelsState] = useState<Channels[]>([])

    useEffect(() => {
        axios.get(`${URL_BASE}/channels?schemaName=${params.schema}`)
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
        <div className="singleChannelSuperContainer">
            {/* <NavProfileAndLocation/> */}
            {/* <ChannelNotFound/> */}
            {/* <AddChannel dep={add} handleAdd={handleAdd}/> */}
                {/* <div className="singleChannelSuperContainer"> */}
                    <div className="singleChannel-outer-div">
                        {
                            channelsState.length > 0 ?
                            channelsState.map(el => {
                                return <SingleChannelAWS channel={el.channelName} key={el.channelId}/>
                            })
                            :
                            <div className='singleChannel-notfound'>There are no channels here yet</div>
                        }
                        {/* <div className="channelsAddChannel2">
                            <h4>Add channel</h4>
                            <button onClick={handleAdd}>+</button>
                        </div> */}
                    </div>
                    {/* <Link to="/createVids">
                    <button >Crear un video</button>
                    </Link> */}
                {/* </div> */}

        </div>
    )
}