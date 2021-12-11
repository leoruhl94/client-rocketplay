import React, { useEffect } from "react"
import { NavProfileAndLocation } from "../../containers/NavProfileAndLocation/NavProfileAndLocation"
import {Link} from "react-router-dom";
import './Categories.scss'

interface Props {
    channel: string
  }
export const Categories: React.FC<Props> = ({channel}) => {

    return(
        <div className="Categories__container">
            <NavProfileAndLocation/> 
            <div className="Categories">
                {numToArr(5).map(x => 
                    <Link to={`/home/${channel}/${x}`} className="Categories-link">
                        <div className="Categories__item">
                            <div>{x}</div>
                            <div className="singleChannelArrow">
                                <p>{">"}</p>
                            </div>
                        </div>
                    </Link>
                )}
            </div>

        </div>
    )
}

function numToArr(n: number){
    let arr: string[] = []
    for(let i = 0; i < n; i++){arr.push(`Category N°${i+1}`)}
    return arr
}