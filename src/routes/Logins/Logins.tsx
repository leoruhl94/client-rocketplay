//Styles
import "./Logins.scss";
//Libraries
import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import GoogleLogin from "react-google-login";

//Components
import { Icon } from "../../components/Icon/Icon";
import { useAuth } from "../../auth/useAuth";
//Redux
import { loginRegister } from "../../redux/actions";
//constantes
import { CLIENT_ID, COOKIES_POLICY, URL_BASE } from "../../constants/constants";
import { storeState } from "src/redux/type";

export const Logins: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [keepSession, setKeepSession] = useState(true);
  const auth = useAuth();
  const { plan } = useSelector((state: storeState) => state);

  let lastRoute = localStorage.getItem("lastRoute") || '';
  useEffect(()=>{
    if (auth?.isLogged()) {
      if (plan && lastRoute === "/pricing") history.push("/payment");
      else history.push("/home");
    }
    console.log(auth?.isLogged(), ">>>>>>>")
  },[auth?.isLogged()])

  async function responseGoogle(googleUser) {
    //Obtener Tokens mediante el code
    const tokens = await axios.post(`${URL_BASE}/loginUser`, {
      code: googleUser.code,
    });

    //Loguear o Registrar usuario
    dispatch(loginRegister(tokens, keepSession, auth));
  }

  function errorGoogle(response) {
    console.log(response);
  }

  function handleCheck(e) {
    setKeepSession(e.target.checked ? true : false);
  }

  return (
    <div>
      <section className={`navigationTop login_navTop`}>
        <NavLink
          className="navigationTop__navLink navigationTop__navLink_onlyDesktop"
          to="/"
        >
          Home
        </NavLink>
        <NavLink className="navigationTop__navLink " to="/pricing">
          Pricing
        </NavLink>
        <NavLink className="navigationTop__navLink " to="/about">
          About
        </NavLink>
      </section>

      {/* <LoginGoogle res={responseGoogle} fail={errorGoogle} /> */}
      <div className="Logs">
        <h2 className="Logs_title">
          Log in / Sign up to start using our service
        </h2>
        <div className="Logs_logo">
          <Icon svg="logoDarkColor" />
        </div>
        <div className="singleButton">
          <GoogleLogin
            clientId={CLIENT_ID}
            buttonText="Log in/Sign up with Google "
            scope="profile email" /*https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.force-ssl" */
            className="botoncito"
            accessType="offline"
            responseType="code"
            onSuccess={responseGoogle}
            onFailure={errorGoogle}
            cookiePolicy={COOKIES_POLICY}
            /* prompt="consent" */
          />
        </div>
        <label className="logs_keppSession-lbl">
          <input
            type="checkbox"
            name="keepSession"
            className="logs_keppSession-cb"
            onChange={handleCheck}
            checked={keepSession}
          />
          Keep my account logged in
        </label>
      </div>

    </div>
  );
};
