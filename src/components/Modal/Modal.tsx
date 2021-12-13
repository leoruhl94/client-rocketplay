import React from "react";
import "./Modal.scss";

export const Modal: React.FC = ({ children }) => {
  return (
    <article className=" Modal Modal__open">
      <div className="ModalContainer">
        <button className="Modal__button_close"> X </button>
        {children}
      </div>
    </article>
  );
};
