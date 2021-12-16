import React from "react";
import "./Modal2.scss";
import { Icon } from "../Icon/Icon";

interface Props{
  title?: string;
  isOpen: boolean;
  closeModal():any;

  fullWidth?:boolean;
}
export const Modal2: React.FC<Props> = ({ children, isOpen, closeModal, title, fullWidth=false}) => {

  return (
    <article className={` Modal2 ${ isOpen ?"Modal__open2" : ""}`}>
      <div className={`ModalContainer2 ${fullWidth? "fullWidth": ""}`} >
        <h3 className="Modal__title2">{title}</h3>
        <button className="Modal__button_close2" onClick={closeModal}><Icon svg="doubleArrow"/></button>
        {children}
      </div>
    </article>
  );
};
 