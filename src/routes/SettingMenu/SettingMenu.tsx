import axios from "axios";
import { motion } from "framer-motion";
import React from "react";
import { MenuToggleContainer } from "../../components/MenuToggleContainer/MenuToggleContainer";
import "./SettingMenu.scss";

interface props {
  transition: any;
}
export const SettingMenu: React.FC<props> = ({ transition }) => {
  return (
    <motion.div
      initial="out"
      animate="in"
      exit="out"
      variants={transition}
      transition={{ type: "linear" }}
    >
      <MenuToggleContainer transition={transition}>
        <nav className="SettingMenu__container">
          {/* <div className="container"> */}
          <ul className="SettingMenu__ul">
            <li>
              Workspace
              <ul className="SettingMenu__submenu_ul">
                <li>Edit your code</li>
                <li>Edit your workspace name</li>
                <li>Admin your subcribers</li>
                <li>...</li>
                <li>...</li>
              </ul>
            </li>
            <li>
              Channels
              <ul className="SettingMenu__submenu SettingMenu__ul">
                <li>...</li>
                <li>...</li>
                <li>...</li>
              </ul>
            </li>
            <li>
              Categories
              <ul className="SettingMenu__submenu SettingMenu__ul">
                <li>Edit name</li>
                <li>Change privacy</li>
                <li>Add/Remove</li>
              </ul>
            </li>
            <li>
              Videos
              <ul className="SettingMenu__submenu SettingMenu__ul">
                <li>Upload</li>
                <li>Delete</li>
                <li>Edit description</li>
                <li>Tags</li>
              </ul>
            </li>
            <li>
              Subscriptions
              <ul className="SettingMenu__submenu SettingMenu__ul">
                <li>TOGGlE Activar/Pausar</li>
                <li>Cancelar</li>
                <li>qué le pongo a esto????</li>
                <li>qué le pongo a esto????</li>
                <li>qué le pongo a esto????</li>
              </ul>
            </li>
            <li>qué le pongo a  esto????</li>
          </ul>
          {/* </div> */}
        </nav>
      </MenuToggleContainer>
    </motion.div>
  );
}; 
