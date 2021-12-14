import React from "react";
import "./DropdownMenuItem.scss"
import { Icon } from "../../../components/Icon/Icon";
    interface MenuItem {
    title: String;
    isOpen: Boolean;
  }
  export const DropdownMenuItem: React.FC<MenuItem> = ({ title , isOpen }) => {
    return (
      <div className={`${ isOpen ?"MenuItem__container" : "display__none"}`}>
        <button className="MenuItem__button">
          <span className="MenuItem__button_text">{title}</span>
          <span className="MenuItem__button_icon">
            <Icon svg="goNext" />
          </span>
        </button>
      </div>
    );
  };
  