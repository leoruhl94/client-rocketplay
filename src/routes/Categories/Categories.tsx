import React, { useEffect } from "react"
import { NavigationMobile } from "../../containers/NavigationMobile/NavigationMobile"
import { NavProfileAndLocation } from "../../containers/NavProfileAndLocation/NavProfileAndLocation"
import './Categories.scss'

interface Props {
    channel: string
  }
export const Categories: React.FC<Props> = ({channel}) => {

    useEffect(()=> {localStorage.setItem('lastRoute', '/home/'+channel)}, [])
    return(
        <div className="Categories__container">
            <NavProfileAndLocation/> 
            <div className="Categories">
                {numToArr(5).map(x => 
                    <div className="Categories__item">
                        {`#Clase ${x}`}
                    </div>
                )}
            </div>
            <NavigationMobile back="/home"/>
        </div>
    )
}
function numToArr(n: number){
    let arr: number[] = []
    for(let i = 0; i < n; i++){arr.push(i)}
    return arr
}