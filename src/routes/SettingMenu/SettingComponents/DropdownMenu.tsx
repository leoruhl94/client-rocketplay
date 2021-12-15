import React from "react";
import "./DropdownMenu.scss"
import { Icon } from "../../../components/Icon/Icon";
import { useOpen } from "../../../Hooks/useOpen"
interface DropdownMenu {
  title: String;
  isOpen: Boolean;
  close():any;
  open():any;
}

export const DropdownMenu: React.FC<DropdownMenu> = ({ children, title, isOpen, close, open }) => {    return (
    <div className="DropdownMenu__container">
      <button className="DropdownMenu__button" onClick={ isOpen ? close: open}>
        <span className="DropdownMenu__button_text">{title}</span>
        <span className="DropdownMenu__button_icon">
          <Icon svg="arrowDown" />
        </span>
      </button>
      {children}
    </div>
  );
};
