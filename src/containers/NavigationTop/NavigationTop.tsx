import React from "react";
import "./NavigationTop.scss";
import { NavLink } from "react-router-dom";


export const NavigationTop: React.FC = () => {


  return (
    <section className="navigationTop">
        <NavLink className="navigationTop__navLink navigationTop__navLink_onlyDesktop" to="/">Home</NavLink>
        <NavLink className="navigationTop__navLink " to="/login">Log In / Sign Up</NavLink>
    </section>
  );
};
