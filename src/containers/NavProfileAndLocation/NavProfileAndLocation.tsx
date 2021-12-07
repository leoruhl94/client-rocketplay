import React, { useState } from "react"
import { useLocation } from "react-router"
import { ProfileWnd } from "../../components/Login-Register/ProfileWnd"
import './NavProfileAndLocation.scss'

interface User {
    accessToken: '', 
    name: '',
    pic: ''
  }
interface Props{
    header?: string
}
export const NavProfileAndLocation: React.FC<Props> = ({header='RocketPlay'}) => {
    const json = localStorage.getItem('user')
    const location = useLocation()
    let headerRoute = location.pathname?.slice(1).split('/').join(' > ')
    const profile: User = json ? JSON.parse(json) : null
    const [wndProfile, setWndProfile] = useState(false) 
    if(headerRoute.startsWith('videodetail')){
        headerRoute = header
    }
    
    return (
        <nav className="channelsNav">
            <ul className="title">{`${headerRoute}`}</ul>
            <ul className="channelsNavUl ">
                <button className="channelsNavProfileBtn" onClick={()=>{setWndProfile(!wndProfile)}}>
                    <img className="Profile_image" src={profile.pic}/>
                </button>
                <ProfileWnd dep={wndProfile}/>
            </ul>
        </nav>
    )
}