import React, { useEffect, useState } from "react";
import "./NavigationTop.scss";
import { NavLink } from "react-router-dom";
import { ProfileWnd } from "../../routes/Logins/Login-Register/ProfileWnd";
import { useAuth } from "../../auth/useAuth";

import { Icon } from "../../components/Icon/Icon";
import logo from "../../images/OnlyRocket.png";
import { Modal2 } from "../../components/Modal2/Modal2";
import { useOpen } from "../../Hooks/useOpen";
import { useHistory } from "react-router";
import { MenuTodo } from "../../routes/SettingMenu/SettingMenu";
import { Notifications2 } from "../../routes/NotificationsMenu/NotificationsMenu";

export const NavigationTop: React.FC = () => {
  const auth = useAuth();
  const user = auth?.user;
  console.log("useAuth load profile");
  const [wndProfile, setWndProfile] = useState(false);
  const [isOpenM1, openModal1, closeModal1] = useOpen(false);
  const [isOpenM2, openModal2, closeModal2] = useOpen(false);
  const history = useHistory();

  useEffect(() => {
    console.log("cambio");
    setWndProfile(false);
  }, [location]);

  return (
    <section className={`NavigationTop `}>
      <NavLink className="NavigationTop__navLink_logo " to="/">
        <img className="NavigationTop__navLink_logo_icon" src={logo} />
        <span className="NavigationTop__navLink_logo_text ">Rocket Play</span>
      </NavLink>
      <div className="NavigationTop__Links_containers ">
        {auth?.isLogged && user ? (
          <NavLink className={`NavigationTop__navLink `} to="/home">
            Home
          </NavLink>
        ) : (
          ""
        )}
        <NavLink className="NavigationTop__navLink " to="/pricing">
          Pricing
        </NavLink>
        <NavLink className="NavigationTop__navLink " to="/about">
          About
        </NavLink>

        {auth?.isLogged && user ? (
          <div className="NavigationTop__profile ">
            <button
              className="NavigationTop__button"
              onClick={() => {
                history.push("/search");
              }}
            >
              <Icon svg="search" />
            </button>
            <button
              className="NavigationTop__button"
              onClick={isOpenM1 ? closeModal1 : openModal1}
            >
              <Icon svg="settings" />
            </button>
            <button
              className="NavigationTop__button"
              onClick={isOpenM2 ? closeModal2 : openModal2}
            >
              <Icon svg="bellSolid" />
            </button>
            <button
              className="NavigationTop__profile_button"
              onClick={() => setWndProfile(!wndProfile)}
            >
              <img className="Profile_image" src={user?.pic + ""} />
            </button>
            <ProfileWnd dep={wndProfile} />
          </div>
        ) : (
          <NavLink className="navigationTop__navLink " to="/login">
            Log In / Sign Up
          </NavLink>
        )}
      </div>

      <Modal2 isOpen={isOpenM1} closeModal={closeModal1} title="Settings">
        <MenuTodo />
      </Modal2>
      <Modal2 isOpen={isOpenM2} closeModal={closeModal2} title="Notifications">
        <Notifications2></Notifications2>
      </Modal2>
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
