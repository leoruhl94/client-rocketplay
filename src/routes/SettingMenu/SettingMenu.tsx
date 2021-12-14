import axios from "axios";
import { motion } from "framer-motion";
import React from "react";
import { MenuToggleContainer } from "../../components/MenuToggleContainer/MenuToggleContainer";
import "./SettingMenu.scss";
import { SuperToggle } from "../../components/Buttons/SuperToggleButton/SuperToggle";
import { SuperToast } from "../../components/Toast/SuperToast";
import { URL_BASE } from "../../constants/constants";

import { useAuth } from "../../auth/useAuth";
interface props {
  transition: any;
}
export const SettingMenu: React.FC<props> = ({ transition }) => {
  const auth = useAuth();
  const handleOnUpdateSubscriptions = async (value: String) => {
    console.log(value);
    let res = await axios.put(`${URL_BASE}/subscriptions`, {
      email: auth?.user?.email,
      status: value,
    });
  };
  return (
      <MenuToggleContainer transition={transition} k='key5'>
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

          <ul className="SettingMenu__submenu SettingMenu__ul">
            Subscriptions
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
          </ul>

          {/* </div> */}
        </nav>
      </MenuToggleContainer>
  );
};
