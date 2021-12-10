import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "../../components/Icon/Icon";

const NavigationMobileMagic: React.FC = () => {
  return (
    <div className="navigarionMobileMagic">
      <ul>
        <li className="navigationMobileMagic__list">
          <Link to="/">
            <span className="navigationMobileMagic__icon">
              <Icon svg="homeSolid" />
            </span>
            <span className="navigarionMobileMagic__text">Back</span>
          </Link>
        </li>
        <li className="navigationMobileMagic__list">
          <Link to="/">
            <span className="navigationMobileMagic__icon">
              <Icon svg="search" />
            </span>
            <span className="navigarionMobileMagic__text">Search</span>
          </Link>
        </li>
        <li className="navigationMobileMagic__list">
          <Link to="/">
            <span className="navigationMobileMagic__icon">
              <Icon svg="homeSolid" />
            </span>
            <span className="navigarionMobileMagic__text">Home</span>
          </Link>
        </li>
        <li className="navigationMobileMagic__list">
          <Link to="/">
            <span className="navigationMobileMagic__icon">
              <Icon svg="bellSolid" />
            </span>
            <span className="navigarionMobileMagic__text">Channels</span>
          </Link>
        </li>
        <li className="navigationMobileMagic__list">
          <Link to="/">
            <span className="navigationMobileMagic__icon">
              <Icon svg="settings" />
            </span>
            <span className="navigarionMobileMagic__text">Settings</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};
