import React from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "../../components/Icon/Icon";

const NavigationMobileMagic: React.FC = () => {
  return (
    <div className="navigarionMobileMagic">
      <ul className="navigarionMobileMagic__list navigarionMobileMagic__active">
        <li className="navigationMobileMagic__listItem">
          <NavLink to="/">
            <span className="navigationMobileMagic__icon">
              <Icon svg="homeSolid" />
            </span>
            <span className="navigarionMobileMagic__text">Back</span>
          </NavLink>
        </li>
        <li className="navigationMobileMagic__list">
          <NavLink to="/" className="navigationMobileMagic__navLink">
            <span className="navigationMobileMagic__icon">
              <Icon svg="search" />
            </span>
            <span className="navigarionMobileMagic__text">Search</span>
          </NavLink>
        </li>
        <li className="navigationMobileMagic__list">
          <NavLink to="/">
            <span className="navigationMobileMagic__icon">
              <Icon svg="homeSolid" />
            </span>
            <span className="navigarionMobileMagic__text">Home</span>
          </NavLink>
        </li>
        <li className="navigationMobileMagic__list">
          <NavLink to="/">
            <span className="navigationMobileMagic__icon">
              <Icon svg="bellSolid" />
            </span>
            <span className="navigarionMobileMagic__text">Channels</span>
          </NavLink>
        </li>
        <li className="navigationMobileMagic__list">
          <NavLink to="/">
            <span className="navigationMobileMagic__icon">
              <Icon svg="settings" />
            </span>
            <span className="navigarionMobileMagic__text">Settings</span>
          </NavLink>
        </li>
        <div className="navigarionMobileMagic__indicator"></div>
      </ul>
    </div>
  );
};
