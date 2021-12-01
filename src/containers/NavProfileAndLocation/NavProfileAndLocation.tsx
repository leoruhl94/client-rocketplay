import React, { useState } from "react"
import { ProfileWnd } from "../../components/Login-Register/ProfileWnd"
import './NavProfileAndLocation.scss'

interface User {
    accessToken: '', 
    name: '',
    pic: ''
  }
export const NavProfileAndLocation: React.FC = () => {
    const json = localStorage.getItem('user')
    const lastRoute = localStorage.getItem('lastRoute')
    const profile: User = json ? JSON.parse(json) : null
    const [wndProfile, setWndProfile] = useState(false) 
    
    return (
        <nav className="channelsNav">
            <ul className="channelsNavUl">Channels</ul>
            <ul className="channelsNavUl ">
                <button className="channelsNavProfileBtn" onClick={()=>{setWndProfile(!wndProfile)}}>
                    <img className="Profile_image" src={profile.pic}/>
                </button>
                <ProfileWnd dep={wndProfile}/>
            </ul>
        </nav>
    )
}