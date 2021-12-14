import React, { useEffect, useState } from "react";
import "./Workspaces.scss";
import { ProfileWnd } from "../Logins/Login-Register/ProfileWnd";
import { AddWorkspace } from "./AddWorkspace/AddWorkspace";
import { Icon } from "../../components/Icon/Icon";
import axios from "axios";
import { URL_BASE } from "../../constants/constants";
import { pageTransition } from "../../constants/functions";
import { motion } from "framer-motion";

import { useAuth } from "../../auth/useAuth";
import { NavProfileAndLocation } from "../../containers/NavProfileAndLocation/NavProfileAndLocation";
import { WorkspaceItem } from "./WorkspaceItem";
import { MenuToggleContainer } from "../../components/MenuToggleContainer/MenuToggleContainer";

interface props {
  transition: any;
}
export const Workspaces: React.FC<props> = ({ transition }) => {
  const auth = useAuth();
  const [add, setAdd] = useState(false);

  function handleAdd() {
    setAdd(!add);
  }
  //console.log("--", auth?.user?.workspaces);
  function refreshWorkspace() {
    auth?.refreshInfo()
  }

  return (
    <>
      {/* <NavProfileAndLocation></NavProfileAndLocation> */}
      <AddWorkspace dep={add} handleAdd={handleAdd} refreshWorkspace={refreshWorkspace}/>
      <MenuToggleContainer transition={transition} k='key3'>
        <section className="Workspaces__container">
          <div className="Workspaces__list">
            <h2
              className={`Workspaces__title ${
                auth?.user?.workspacesTitles?.length ? "display__none" : ""
              }`}
            >
              You do not belong to a workspace yet
            </h2>

            {auth?.user?.workspacesTitles?.length
              ? auth?.user?.workspacesTitles.map((item, i) => {
                  return (
                    <WorkspaceItem
                      key={i}
                      workspace={item}
                      path={
                        auth?.user?.workspaces?.length
                          ? auth.user.workspaces[i]
                          : ""
                      }
                    />
                  );
                })
              : ""}

            <div className="Workspaces__button_container">
              <button className="Workspaces__button" onClick={handleAdd}>
                Join a Workspace
                <span className="Workspaces__button_icon">
                  <Icon svg="plusCircle" />
                </span>
              </button>
            </div>
          </div>
        </section>
      </MenuToggleContainer>
    </>
  );
};
