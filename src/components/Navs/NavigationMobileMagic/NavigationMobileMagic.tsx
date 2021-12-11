import React from "react";
// import { button } from "react-router-dom";
import { Icon } from "../../Icon/Icon";
import "./NavigationMobileMagic.scss";
import { useLocation, useHistory } from "react-router";
import { useAuth } from "../../../auth/useAuth";
export const NavigationMobileMagic: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const auth = useAuth();

  const handleOnclickHome = () => {
    console.log(location,auth?.isLogged());
    if (auth?.isLogged()) {
      history.push("/home");
    } else {
      history.push("/");
    }
  };
  const handleDisplayMenu = (path) => {
      history.push(`${path}`);
  };
  const handleGoBack = () => {
    if (location.pathname === "/home") {
      history.push("/");
    } else {
      history.goBack();
    }
  };

  return (
    <div className="navigationMobileMagic">
      <ul className="navigationMobileMagic__list ">
        <li className={`navigationMobileMagic__listItem`}>
          <button
            onClick={handleGoBack}
            className={`navigationMobileMagic__button `}
          >
            <div>
              <span className="navigationMobileMagic__icon">
                <Icon svg="goBack" />
              </span>
            </div>
            <span className="navigationMobileMagic__text">Back</span>
          </button>
        </li>
        <li className={`navigationMobileMagic__listItem ${!auth?.isLogged()?"display__none":""}`}>
          <button
            onClick={()=>handleDisplayMenu("search")}
            className="navigationMobileMagic__button"
          >
            <div>
              <span className="navigationMobileMagic__icon">
                <Icon svg="search" />
              </span>
            </div>
            <span className="navigationMobileMagic__text">Search</span>
          </button>
        </li>
        <li className="navigationMobileMagic__listItem">
          <button
            onClick={handleOnclickHome}
            className="navigationMobileMagic__button"
          >
            <div>
              <span className="navigationMobileMagic__icon">
                <Icon svg="homeSolid" />
              </span>
            </div>
            <span className="navigationMobileMagic__text">Home</span>
          </button>
        </li>
        <li className={`navigationMobileMagic__listItem ${!auth?.isLogged()?"display__none":""}`}>
          <button
            onClick={()=>handleDisplayMenu("notifications")}
            className="navigationMobileMagic__button"
          >
           <div>
              <span className="navigationMobileMagic__icon">
                <Icon svg="bellSolid" />
              </span>
            </div>
            <span className="navigationMobileMagic__text">Notifications</span>
          </button>
        </li>
        <li className={`navigationMobileMagic__listItem ${!auth?.isLogged()?"display__none":""}`}>
          <button
            onClick={()=>handleDisplayMenu("settings")}
            className="navigationMobileMagic__button"
          >
            <div>
              <span className="navigationMobileMagic__icon">
                <Icon svg="settings" />
              </span>
            </div>
            <span className="navigationMobileMagic__text">Settings</span>
          </button>
        </li>
        <li className={`navigationMobileMagic__listItem ${auth?.isLogged()?"display__none":""}`}>
          <button
            onClick={()=>history.push("/login")}
            className="navigationMobileMagic__button"
          >
            <div>
              <span className="navigationMobileMagic__icon">
                <Icon svg="logIn" />
              </span>
            </div>
            <span className="navigationMobileMagic__text">Log In</span>
          </button>
        </li>
       
      </ul>
    </div>
  );
};
function isLogged() {
  throw new Error("Function not implemented.");
}
