import React from "react";
import "./DropdownMenuItem.scss"
import { Icon } from "../../../components/Icon/Icon";
import { Modal } from "../../../components/Modal/Modal";
import { useOpen } from "../../../Hooks/useOpen";
    interface MenuItem {
    title: string;
    isOpen: boolean;
  }
  export const DropdownMenuItem: React.FC<MenuItem> = ({ title , isOpen, children }) => {
    const [isOpenModal, openModal, closeModal] = useOpen(false);
    return (
      <div className={`${ isOpen ?"MenuItem__container" : "display__none"}`}>
        <button className="MenuItem__button" onClick={openModal}>
          <span className="MenuItem__button_text">{title}</span>
          <span className="MenuItem__button_icon">
            <Icon svg="goNext" />
          </span>
        </button>
          <Modal title={title} closeModal={closeModal} isOpen={isOpenModal} >{children}</Modal>
      </div>
    );
  };
  