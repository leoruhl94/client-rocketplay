import axios from "axios";
import { motion } from "framer-motion";
import React from "react";
import { MenuToggleContainer } from "../../components/MenuToggleContainer/MenuToggleContainer";
import "./SettingMenu.scss";
import { SuperToggle } from "../../components/Buttons/SuperToggleButton/SuperToggle";
import { SuperToast } from "../../components/Toast/SuperToast";
import { URL_BASE } from "../../constants/constants";
import { AddChannel } from "./SettingComponents/AddChannel";
import { useAuth } from "../../auth/useAuth";
import { Modal } from "../../components/Modal/Modal";
import { DropdownMenu } from "./SettingComponents/DropdownMenu";
import { DropdownMenuItem } from "./SettingComponents/DropdownMenuItem";
import { useOpen } from "../../Hooks/useOpen";

interface props {
  transition: any;
}

interface Open {
  isOpen: Boolean;
  openModal(): void;
  closeModal(): void;
}

export const SettingMenu: React.FC<props> = ({ transition }) => {
  const auth = useAuth();
  ///==================MODALS===================
  const [isOpen, openModal, closeModal] = useOpen(false); 
  ///==================MENUS===================
  const [isOpenMenuAccount, openMenuAccount, closeMenuAccount] = useOpen(false); 
  const [isOpenMenuWorkspace, openMenuWorkspace, closeMenuWorkspace] = useOpen(false); 
  const [isOpenMenuChannels, openMenuChannels, closeMenuChannels] = useOpen(false); 
  const [isOpenMenuCategories, openMenuCategories, closeMenuCategories] = useOpen(false); 
  const [isOpenMenuTags, openMenuTags, closeMenuTags] = useOpen(false); 
  ///==================MENUS===================
  const handleOnUpdateSubscriptions = async (value: String) => {
    let res = await axios.put(`${URL_BASE}/subscriptions`, {
      email: auth?.user?.email,
      status: value,
    });
  };
  console.log(isOpen);

  return (
    <MenuToggleContainer transition={transition} k="002">

      <nav className="SettingMenu__container">
      <DropdownMenu title="Account" isOpen={isOpenMenuAccount} close={closeMenuAccount} open={openMenuAccount}>
        <DropdownMenuItem isOpen={isOpenMenuAccount} title="MyAccount"></DropdownMenuItem>
        <DropdownMenuItem isOpen={isOpenMenuAccount} title="Subscriptions"></DropdownMenuItem>
      </DropdownMenu>
      <DropdownMenu title="Workspace" isOpen={isOpenMenuWorkspace} close={closeMenuWorkspace} open={openMenuWorkspace}>
        <DropdownMenuItem isOpen={isOpenMenuWorkspace} title="Edit Workspace"></DropdownMenuItem>
        <DropdownMenuItem isOpen={isOpenMenuWorkspace} title="Members"></DropdownMenuItem>
      </DropdownMenu>
      <DropdownMenu title="Channels" isOpen={isOpenMenuChannels} close={closeMenuChannels} open={openMenuChannels}>
        <DropdownMenuItem isOpen={isOpenMenuChannels} title="Add Channel"></DropdownMenuItem>
        <DropdownMenuItem isOpen={isOpenMenuChannels} title="Edit Channel"></DropdownMenuItem>
      </DropdownMenu>
      <DropdownMenu title="Categories" isOpen={isOpenMenuCategories} close={closeMenuCategories} open={openMenuCategories}>
        <DropdownMenuItem isOpen={isOpenMenuCategories} title="Add Tags"></DropdownMenuItem>
        <DropdownMenuItem isOpen={isOpenMenuCategories} title="Edit Category"></DropdownMenuItem>
        <DropdownMenuItem isOpen={isOpenMenuCategories} title="Change privacy"></DropdownMenuItem>
      </DropdownMenu>
      <DropdownMenu title="Tags" isOpen={isOpenMenuTags} close={closeMenuTags} open={openMenuTags}>
        <DropdownMenuItem isOpen={isOpenMenuTags} title="Add Tags"></DropdownMenuItem>
        <DropdownMenuItem isOpen={isOpenMenuTags} title="Remove Tags"></DropdownMenuItem>
      </DropdownMenu>

  
       {/* <ul className="SettingMenu__submenu SettingMenu__ul">
          <button onClick={openModal}>Subscriptions</button>

          <Modal isOpen={isOpen} closeModal={closeModal} title="bla">
            <AddChannel></AddChannel>
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
        </ul> */}
      </nav>
    </MenuToggleContainer>
  );
};
