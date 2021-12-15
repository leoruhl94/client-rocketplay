import React, { useState } from "react"
import { useSelector } from "react-redux"
import { useLocation } from "react-router"
import { storeState } from "src/redux/type"
import { ProfileWnd } from "../../routes/Logins/Login-Register/ProfileWnd"
import './NavProfileAndLocation.scss'
import {useAuth} from "../../auth/useAuth"

interface Props{
    header?: string
}
export const NavProfileAndLocation: React.FC<Props> = ({header='RocketPlay'}) => {
    const location = useLocation()
    const auth = useAuth()
    let headerRoute = location.pathname?.slice(1).split('/').join(' > ')
    const {profile} = useSelector((state: storeState) => state)
    const [wndProfile, setWndProfile] = useState(false) 
    if(headerRoute.startsWith('videodetail')){
        headerRoute = header
    }
    
    return (<>
        <nav className="channelsNav">
            <ul className="title">{`${headerRoute}`}</ul>
            <ul className="channelsNavUl ">
                <button className="channelsNavProfileBtn" onClick={()=>{setWndProfile(!wndProfile)}}>
                    <img className="Profile_image" src={auth?.user?.pic+''}/>
                </button>
                <ProfileWnd dep={wndProfile}/>
            </ul>
        </nav>
        <div className="channelsNav__ocupaEspacio"></div>
        </>
    )
}