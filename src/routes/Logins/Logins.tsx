//Libraries
import React, { useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import CSS from "csstype";
import { storeState } from "../../redux/type";

//Components
import { NavigationMobile } from "../../containers/NavigationMobile/NavigationMobile";
import { Icon } from "../../components/Icon/Icon";
import { LoginAccountType } from "../../components/Login-Register/LoginAccountType";
import { LoginGoogle } from "../../components/Login-Register/LoginGoogle";
import { LoginPlan } from "../../components/Login-Register/LoginPlan2";

//Redux
import { changeProfile } from "../../redux/actions";

//Styles
import "./Logins.scss";

//constantes
import { URL_BASE } from "../../constants/constants";

interface User {
  accessToken: "";
  name: "";
  pic: "";
}

export const Logins: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { logsPage } = useSelector((state: storeState) => state);

  const json = localStorage.getItem("user");
  const user: User = json ? JSON.parse(json) : null;

  // useEffect(() => {
  //   user && history.push("/home");
  // }, [user]);

  async function responseGoogle(googleUser, keepSession) {
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
    dispatch(changeProfile(userGoogle, history, keepSession));
  }

  function errorGoogle(response) {
    console.log(response);
  }

  function styleVar(vars: any) {
    const cssVars: CSS.Properties = {};
    if (typeof vars === "object") {
      for (let prop in vars) {
        cssVars["--" + prop] = vars[prop];
      }
    }
    return cssVars;
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

      <div className="slideComp" style={styleVar({ i: 0, page: logsPage })}>
        <LoginGoogle res={responseGoogle} fail={errorGoogle} />
      </div>
      <div className="slideComp" style={styleVar({ i: 1, page: logsPage })}>
        <LoginAccountType />
      </div>
      <div className="slideComp" style={styleVar({ i: 2, page: logsPage })}>
        <LoginPlan />
      </div>
      <NavigationMobile />
    </div>
  );
};
