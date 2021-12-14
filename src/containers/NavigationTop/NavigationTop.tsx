import React, { useEffect, useState } from "react";
import "./NavigationTop.scss";
import { NavLink } from "react-router-dom";
import { ProfileWnd } from "../../routes/Logins/Login-Register/ProfileWnd";
import { useAuth } from "../../auth/useAuth";
import { useSelector } from "react-redux";
import { storeState } from "src/redux/type";


export const NavigationTop: React.FC = () => {
  const auth = useAuth()
  const user = auth?.user
  const {profile} = useSelector((state: storeState) => state)
  console.log('useAuth load profile')
  const [wndProfile, setWndProfile] = useState(false);

  useEffect(() => {
    console.log('cambio')
    setWndProfile(false)
  }, [location]);

  return (
    <section className={`navigationTop ${user? "navigationTop_user" : ""}`}>
      <NavLink className="navigationTop__navLink navigationTop__navLink_onlyDesktop" to="/home">Home</NavLink>

      {user ? (
        <ul className="channelsNavUl ">
          <button
            className="channelsNavProfileBtn"
            onClick={() => setWndProfile(!wndProfile)}
          >
            <img className="Profile_image" src={profile.pic} />
          </button>
          <ProfileWnd dep={wndProfile} />
        </ul>
      ) : (
        <NavLink className="navigationTop__navLink " to="/login">
          Log In / Sign Up
        </NavLink>
      )}
    </section>
  );
};

// export const NavProfileAndLocation: React.FC<Props> = ({header='RocketPlay'}) => {
// const json = localStorage.getItem('user')
// const location = useLocation()
// let headerRoute = location.pathname?.slice(1).split('/').join(' > ')
// const profile: User = json ? JSON.parse(json) : null
// const [wndProfile, setWndProfile] = useState(false)
// if(headerRoute.startsWith('videodetail')){
//     headerRoute = header
// }

//   return (
//       <nav className="channelsNav">
//           <ul className="title">{`${headerRoute}`}</ul>
//           <ul className="channelsNavUl ">
//               <button className="channelsNavProfileBtn" onClick={()=>{setWndProfile(!wndProfile)}}>
//                   <img className="Profile_image" src={profile.pic}/>
//               </button>
//               <ProfileWnd dep={wndProfile}/>
//           </ul>
//       </nav>
//   )
// }
