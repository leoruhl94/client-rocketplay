import React from "react";
import { Link } from "react-router-dom";

import "./Logins.scss";
import { NavigationMobile } from "../../containers/NavigationMobile/NavigationMobile";
import { SuperButton } from "../../components/Buttons/SuperButton/SuperButton";
import { Icon } from "../../components/Icon/Icon";


export const Logins: React.FC = () => {
  return (
    <div>
      <div className="Logs">
        <h2 className="Logs_title">Log in to start using our service</h2>

          {/* <div className="Logs_logo">
          <Icon svg="logoDarkColor"/>
          </div> */}
          {/* <div className="Logs_logo">
          <Icon svg="logoDarkOutline"/>
          </div> */}
          <div className="Logs_logo">
          <Icon svg="logoLightColor"/>
          </div>
          {/* <div className="Logs_logo">
          <Icon svg="logoLightOutline"/>
          </div> */}
        


        <div className="Logs_buttons">
          <SuperButton name={"button_Login"} route="/login" text="Log In" />
          <SuperButton
            name={"button_register"}
            route="/register"
            text="Register"
          />
        </div>
        <Link to="/" className="Logs_link">
          Business account
        </Link>

        <NavigationMobile />
      </div>
    </div>
  );
};
