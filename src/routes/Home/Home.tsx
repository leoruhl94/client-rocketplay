import React, { useEffect } from "react";
import { HomeHeader } from "../../components/HomeComponents/HomeHeader/HomeHeader";
import { HomeImages } from "../../components/HomeComponents/HomeImages/HomeImages";
import { HomeClients } from "../../components/HomeComponents/HomeClients/HomeClients";
import { SuperButton } from "../../components/Buttons/SuperButton/SuperButton";
import "./Home.scss";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { pricingSelect } from "../../redux/actions";
import { NavigationTop } from "../../containers/NavigationTop/NavigationTop";

export const Home: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  function handleClick() {
    dispatch(pricingSelect(""));
    history.push("/login");
  }

  return (
    <div className="allContainer">
      <NavigationTop />
      <HomeHeader />
      <HomeClients />
      <HomeImages />
      {/* <div className="logInButtonContainer">
                <button type="button" className="logInButton"
                onClick={handleClick}>Log In / Sign Up</button>

            </div> */}
    </div>
  );
};
