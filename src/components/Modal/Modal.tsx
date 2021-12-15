import React from "react";
import "./Modal.scss";
import { Icon } from "../Icon/Icon";

interface Props{
  title?: string;
  isOpen: boolean;
  closeModal():any;

  fullWidth?:boolean;
}
export const Modal: React.FC<Props> = ({ children, isOpen, closeModal, title, fullWidth=false}) => {
  console.log("MM", fullWidth)
  return (
    <article className={` Modal ${ isOpen ?"Modal__open" : ""}`}>
      <div className={`ModalContainer ${fullWidth? "fullWidth": ""}`} >
        <h3 className="Modal__title">{title}</h3>
        <button className="Modal__button_close" onClick={closeModal}><Icon svg="xCircle"/></button>
        {children}
      </div>
    </article>
  );
};
 