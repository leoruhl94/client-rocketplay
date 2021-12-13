import React from "react";
import "./singleChannel.scss"
import {Icon} from '../../Icon/Icon'
import { useHistory } from "react-router";
import {useParams} from "react-router";

interface Props {
    channel: string
}
export const SingleChannelAWS: React.FC<Props> = ({channel}) => {
    const history = useHistory()
    let params: any = useParams()
    function handleClick(){
        history.push(`/home/${params.schema}/${channel}`)
    }
    return (
        <div className="singleChannelDiv" onClick={handleClick}>
            <div className="singleChannelIcon">
                <Icon svg='rocketColor'/>
                {/* <img src="nothing" alt="PPP" /> */}
            </div>
            <div className="singleChannelText">
                <h2>{channel}</h2>
            </div>
            <div className="singleChannelArrow">
                <p>{">"}</p>
            </div>
        </div>
    )
}