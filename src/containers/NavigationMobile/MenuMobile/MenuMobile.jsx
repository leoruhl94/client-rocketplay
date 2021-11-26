import "./MenuMobile.css";
import { NavLink } from "react-router-dom";
import Icon from "../../../components/Icon/Icon";

export const MenuMobile = ({ active }) => {
  return (
    <div className={`overlay ${!active ? "overlay_none" : ""}`}>
      <nav className="mobile_menu">
        <NavLink to="/home" className="nav-links ">
          <Icon svg="homeOutline" title="homeOutline" />
          <span className="nav_link_text">Home</span>
        </NavLink>
        <NavLink to="/myGames" className="nav-links ">
          <Icon svg="bookmarkFolderOutline" title="bookmarkFolderOutline" />
          <span className="nav_link_text">My Games</span>
        </NavLink>
        <NavLink to="/addGame" className="nav-links ">
          <Icon svg="plusCircle" title="plusCircle" />
          <span className="nav_link_text">Add Game</span>
        </NavLink>
      </nav>
    </div>
  );
};
