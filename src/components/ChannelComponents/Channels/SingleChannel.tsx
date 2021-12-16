import React from "react";
import "./singleChannel.scss"
import {Icon} from '../../Icon/Icon'
import { useHistory } from "react-router";
import logo from "../../../images/OnlyRocket.png"
interface Props {
    channel: string
}
export const SingleChannel: React.FC<Props> = ({channel}) => {
    const history = useHistory()

    function handleClick(){
        history.push('/home/'+channel)
    }
    return (
        <div className="singleChannelDiv" onClick={handleClick}>
            <div className="singleChannelIcon">
                {/* <Icon svg='rocketColor'/> */}
                <img src={logo} alt="alf" className="WorkspaceItem__img"/>
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