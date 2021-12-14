import axios from "axios";
import { motion } from "framer-motion";
import React from "react";
import { MenuToggleContainer } from "../../components/MenuToggleContainer/MenuToggleContainer";
import "./SettingMenu.scss";
import { SuperToggle } from "../../components/Buttons/SuperToggleButton/SuperToggle";
import { SuperToast } from "../../components/Toast/SuperToast";
import { URL_BASE } from "../../constants/constants";
import { useModal } from "../../components/Modal/useModal";

import { useAuth } from "../../auth/useAuth";
import { Modal } from "../../components/Modal/Modal";
interface props {
  transition: any;
}

interface Open {
  isOpen:Boolean;
  openModal(): void;
  closeModal(): void;
}

export const SettingMenu: React.FC<props> = ({ transition }) => {
  const auth = useAuth();
  const [isOpenModal1, openModal1, closeModal1] = useModal(false);
  const handleOnUpdateSubscriptions = async (value: String) => {
    let res = await axios.put(`${URL_BASE}/subscriptions`, {
      email: auth?.user?.email,
      status: value,
    });
  };
  console.log(isOpenModal1);

  return (
    <MenuToggleContainer transition={transition}>
      <nav className="SettingMenu__container">
        {/* <div className="container"> */}

        <ul className="SettingMenu__ul">
          Workspace
          <li className="SettingMenu__li">Edit your code</li>
          <li className="SettingMenu__li">Edit your workspace name</li>
          <li className="SettingMenu__li">Admin your subcribers</li>
          <li className="SettingMenu__li">...</li>
        </ul>

        <ul className="SettingMenu__submenu SettingMenu__ul">
          Channels
          <li className="SettingMenu__li">Add/Remove</li>
          <li className="SettingMenu__li">Edit name</li>
          <li className="SettingMenu__li">...</li>
        </ul>

        <ul className="SettingMenu__submenu SettingMenu__ul">
          Categories
          <li className="SettingMenu__li">Add/Remove</li>
          <li className="SettingMenu__li">Edit name</li>
          <li className="SettingMenu__li">Change privacy</li>
        </ul>

        <ul className="SettingMenu__submenu SettingMenu__ul">
          Videos
          <li className="SettingMenu__li">Upload</li>
          <li className="SettingMenu__li">Delete</li>
          <li className="SettingMenu__li">Edit description</li>
          <li className="SettingMenu__li">Tags</li>
        </ul>

        <ul className="SettingMenu__submenu SettingMenu__ul" >
                <button onClick={openModal1}>
                  
                   Subscriptions
                  </button>
                
          <Modal isOpen={isOpenModal1} closeModal={ closeModal1 } title="bla">
            <li className="SettingMenu__li  SettingMenu__toggle">
              <h4>Activar/Pausar</h4>
              <SuperToggle
                handleChecked={() => {
                  handleOnUpdateSubscriptions("authorized");
                }}
                handleUnchecked={() => handleOnUpdateSubscriptions("paused")}
              ></SuperToggle>
            </li>
            <li className="SettingMenu__li SettingMenu__li_cancel ">
              Cancel Subscription
            </li>
          </Modal>
        </ul>

        {/* </div> */}
      </nav>
    </MenuToggleContainer>
  );
};
