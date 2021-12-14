import React from "react";
import "./Modal.scss";
import { Icon } from "../Icon/Icon";

interface Props{
  title?: string;
  isOpen: Boolean;
  closeModal():any;
}
export const Modal: React.FC<Props> = ({ children, isOpen, closeModal}) => {
  return (
    <article className={` Modal ${ isOpen ?"Modal__open" : ""}`}>
      <div className="ModalContainer">
        <button className="Modal__button_close" onClick={closeModal}><Icon svg="xCircle"/></button>
        {children}
      </div>
    </article>
  );
};
