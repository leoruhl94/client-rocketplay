//Libraries
import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch} from "react-redux";
import axios from "axios";
import GoogleLogin from "react-google-login";

//Components
import { NavigationMobile } from "../../containers/NavigationMobile/NavigationMobile";
import { Icon } from "../../components/Icon/Icon";
// import { LoginAccountType } from "./Login-Register/LoginAccountType";
// import { LoginGoogle } from "./Login-Register/LoginGoogle";
// import { PaymentsPlans } from "./Login-Register/PaymentsPlans";

//Redux
import { loginRegister } from "../../redux/actions";

//Styles
import "./Logins.scss";

//constantes
import { CLIENT_ID, COOKIES_POLICY, URL_BASE } from "../../constants/constants";
import { useAuth } from "../../auth/useAuth";

interface User {
  accessToken: "";
  name: "";
  pic: "";
}

export const Logins: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [keepSession, setKeepSession] = useState(true);
  const auth = useAuth();

  const userLocal = localStorage.getItem("user");
  const userSession = sessionStorage.getItem("user");
  // const user: User = json ? JSON.parse(json) : null;
  if(!!userLocal || !!userSession ){
    history.push("/home")
  }

  async function responseGoogle(googleUser) {
    //Obtener Tokens mediante el code
    const tokens = await axios.post(`${URL_BASE}/loginUser`, {
      code: googleUser.code,
    });
    localStorage.setItem("tok", JSON.stringify(tokens));
    //Obtener datos del usuario
    const data = await axios.get(
      `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${tokens.data.data.id_token}`
    );
    const userGoogle = {
      name: data.data.name,
      pic: data.data.picture,
      email: data.data.email,
    };

    //Loguear o Registrar usuario
    auth?.login(userGoogle);
    dispatch(loginRegister(userGoogle, keepSession));
    history.push("/home");
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

      <NavigationMobile />
    </div>
  );
};
