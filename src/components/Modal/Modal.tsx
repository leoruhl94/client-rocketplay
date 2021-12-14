import React from "react";
import "./Modal.scss";
import { Icon } from "../Icon/Icon";

export const Modal: React.FC = ({ children }) => {
  return (
    <article className=" Modal Modal__open">
      <div className="ModalContainer">
        <button className="Modal__button_close"><Icon svg="xCircle"/></button>
        {children}
      </div>
    </article>
  );
};
