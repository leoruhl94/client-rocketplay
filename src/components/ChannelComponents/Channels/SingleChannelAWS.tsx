import React from "react";
import "./singleChannel.scss"
import {Icon} from '../../Icon/Icon'
import { useHistory } from "react-router";
import {useParams} from "react-router";
import logo from "../../../images/OnlyRocket.png"
interface Props {
    channel: string
    id: number
}
export const SingleChannelAWS: React.FC<Props> = ({channel, id}) => {
    const history = useHistory()
    let params: any = useParams()
    function handleClick(){
        // history.push(`/home/${params.schema}/${channel}-${id}`)
        history.push({
            pathname:`/home/${params.schema}/${channel}---${id}`,
            state: { id:id }
        })
    }
    return (
        <div className="singleChannelDiv" onClick={handleClick}>
            <div className="singleChannelIcon">
                {/* <Icon svg='rocketColor'/> */}
                <img src={logo} alt="alf" className="WorkspaceItem__img"/>
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