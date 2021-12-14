import React from "react";
import { MenuToggleContainer } from "../../components/MenuToggleContainer/MenuToggleContainer";
import "./SettingMenu.scss";
import { useAuth } from "../../auth/useAuth";
import { AddChannel } from "./SettingComponents/AddChannel";
import { DropdownMenu } from "./SettingComponents/DropdownMenu";
import { DropdownMenuItem } from "./SettingComponents/DropdownMenuItem";
import { useOpen } from "../../Hooks/useOpen";
import { AddCategory2 } from "./SettingComponents/AddCategory2";
import { EditChannel } from "./SettingComponents/EditChannels";
import { SubscriptionsSettings } from "./SettingComponents/SubscriptionsSettings";
import { InfoAccount } from "./SettingComponents/InfoAccount";
import { MemberType } from "./SettingComponents/MemberType";
import { EditWorkspace } from "./SettingComponents/EditWorkspace";
import { EditCategory } from "./SettingComponents/EditCategory";

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
  ///==================MENUS===================
  const [isOpenMenuAccount, openMenuAccount, closeMenuAccount] = useOpen(false);
  const [isOpenMenuWorkspace, openMenuWorkspace, closeMenuWorkspace] =
    useOpen(false);
  const [isOpenMenuChannels, openMenuChannels, closeMenuChannels] =
    useOpen(false);
  const [isOpenMenuCategories, openMenuCategories, closeMenuCategories] =
    useOpen(false);

  ///==================MENUS===================

  return (
    <MenuToggleContainer transition={transition} k="002">
      <nav className="SettingMenu__container">
        <DropdownMenu
          title="Account"
          isOpen={isOpenMenuAccount}
          close={closeMenuAccount}
          open={openMenuAccount}
        >
          <DropdownMenuItem isOpen={isOpenMenuAccount} title="MyAccount">
            <InfoAccount />
          </DropdownMenuItem>

          <DropdownMenuItem isOpen={isOpenMenuAccount} title="Subscriptions">
            <SubscriptionsSettings />
          </DropdownMenuItem>
        </DropdownMenu>
        {/* ============================================================== */}
        <DropdownMenu
          title="Workspace"
          isOpen={isOpenMenuWorkspace}
          close={closeMenuWorkspace}
          open={openMenuWorkspace}
        >
          <DropdownMenuItem isOpen={isOpenMenuWorkspace} title="Edit Workspace">
            <EditWorkspace />
          </DropdownMenuItem>

          <DropdownMenuItem isOpen={isOpenMenuWorkspace} title="Members">
            <MemberType />
          </DropdownMenuItem>
        </DropdownMenu>
        {/* ============================================================== */}
        <DropdownMenu
          title="Channels"
          isOpen={isOpenMenuChannels}
          close={closeMenuChannels}
          open={openMenuChannels}
        >
          <DropdownMenuItem isOpen={isOpenMenuChannels} title="Add Channel">
            <AddChannel />
          </DropdownMenuItem>

          <DropdownMenuItem isOpen={isOpenMenuChannels} title="Edit Channel">
            <EditChannel />
          </DropdownMenuItem>
        </DropdownMenu>
        {/* ============================================================== */}
        <DropdownMenu
          title="Categories"
          isOpen={isOpenMenuCategories}
          close={closeMenuCategories}
          open={openMenuCategories}
        >
          <DropdownMenuItem isOpen={isOpenMenuCategories} title="Add Category">
            <AddCategory2 />
          </DropdownMenuItem>

          <DropdownMenuItem isOpen={isOpenMenuCategories} title="Edit Category">
            <EditCategory />
          </DropdownMenuItem>

          <DropdownMenuItem
            isOpen={isOpenMenuCategories}
            title="Change privacy"
          >
            
          </DropdownMenuItem>
        </DropdownMenu>
       
      </nav>
    </MenuToggleContainer>
  );
};
