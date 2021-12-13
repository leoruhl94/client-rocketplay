import React, { useEffect } from "react";
import { LandingHeader } from "./LandingHeader/LandingHeader";
import { LandingSections } from "./LandingSections/LandingSections";
import { LandingCarousel } from "./LandingCarousel/LandingCarousel";
import { SuperButton } from "../../components/Buttons/SuperButton/SuperButton";
import "./Landing.scss";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { pricingSelect } from "../../redux/actions";
import { NavigationTop } from "../../containers/NavigationTop/NavigationTop";

export const Landing: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  function handleClick() {
    dispatch(pricingSelect(""));
    history.push("/login");
  }

  return (
    <div className="allContainer">
      <NavigationTop />
      <LandingHeader />
      <LandingCarousel />
      <LandingSections />
      {/* <div className="logInButtonContainer">
                <button type="button" className="logInButton"
                onClick={handleClick}>Log In / Sign Up</button>

            </div> */}
    </div>
  );
};
