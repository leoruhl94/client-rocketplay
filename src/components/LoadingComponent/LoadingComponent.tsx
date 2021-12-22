import React from "react";
import CSS from 'csstype';
import './LoadingComponent.scss'

export const LoadingComponent: React.FC = () => {
    
    return(
        <div className="loadingContainer">
            <div className="loadingSubContainer">
                {numArrayGen(20).map(x => <SpanCircle key={x} i={x}/>)}
                <div className='rocketContainer'>
                    <svg
                        className="rocket"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 967.8 1132.7"
                    >
                        <path
                            d="M492.6 38.3c-4.9-4.4-12.4-4.4-17.3 0-42.9 37.9-231.1 237.3-253.2 822.5 0 0-149.6 62.3-187.1 236.9h897.8c-37.4-174.6-187-236.9-187-236.9C723.7 275.5 535.4 76.3 492.6 38.3zM420 591.1c-35.3-35.3-35.3-92.5 0-127.8s92.5-35.3 127.8 0 35.3 92.5 0 127.8-92.5 35.3-127.8 0z"
                            fill="#fff"
                            stroke="#fff"
                            strokeWidth={70}
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
            </div>
        </div>
    )
}
function numArrayGen(n: number){
    let arr: number[] = []
    for(let i = 0; i < n; i++){arr.push(i+1)}
    return arr
}
export interface Props {
    i: number
}
const SpanCircle: React.FC<Props> = (props: Props) => {
    const i: string = '--i'
    const spanStyles: CSS.Properties = {
        [i]: `${props.i}`,
    }
    return(
        <span className="littleCircle" style={spanStyles}></span>
    )
}