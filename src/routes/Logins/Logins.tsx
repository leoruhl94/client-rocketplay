import React, {useState} from "react";
import { Link } from "react-router-dom";
import google from "../../images/google.png";
import {useHistory} from 'react-router-dom'

import "./Logins.scss";
import { NavigationMobile } from "../../containers/NavigationMobile/NavigationMobile";
import { SuperButton } from "../../components/Buttons/SuperButton/SuperButton";
import { Icon } from "../../components/Icon/Icon";

export const Logins: React.FC = () => {
  const [sign, setSign] = useState<boolean>(false);
  const history = useHistory();
   
  const handleSign = () :void => {
    setSign(!sign)
  }
  const handleSend = () :void => {
      history.push("/")
  }
  return (
    <div>
      <div className="Logs">
        <h2 className="Logs_title">{`${sign ?'Sign up':'Log in'} to start using our service`}</h2>

        <div className="Logs_logo">
          <Icon svg="logoDarkColor" />
        </div>      
        <div className="singleButton">
          <button className="loginGoogle" onClick={handleSend}>
           { sign ? "Sign up with google ": "Log in with google "}
            <img className="logoGoogle" src={google} alt="google" />
          </button>
        </div>
        <button className="Logins__toggle-botton" onClick={handleSign}>
        { sign ? "Already have an account? Log in": "Don’t have an account? Sign up"}
        </button>

{/* 
        <div className="Logs_buttons">
          <SuperButton
            name={"button_Login"}
            route="/"
            text="Log In with Google "
            classes="loginGoogle"
          />
        </div> */}
 

        <NavigationMobile />
      </div>
    </div>
  );
};
