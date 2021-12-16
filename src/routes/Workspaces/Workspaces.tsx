import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import "./Workspaces.scss";
import { ProfileWnd } from "../Logins/Login-Register/ProfileWnd";
import { AddWorkspace } from "./AddWorkspace/AddWorkspace";
import { Icon } from "../../components/Icon/Icon";
import { Clipboard } from "../../components/Clipboard/Clipboard";
import axios from "axios";
import { URL_BASE } from "../../constants/constants";
import { pageTransition } from "../../constants/functions";
import { motion } from "framer-motion";

import { useAuth } from "../../auth/useAuth";
import { NavProfileAndLocation } from "../../containers/NavProfileAndLocation/NavProfileAndLocation";
import { WorkspaceItem } from "./WorkspaceItem";
import { MenuToggleContainer } from "../../components/MenuToggleContainer/MenuToggleContainer";
import { setToast } from "../../redux/actions"
import { testFunction } from "../../constants/functions";


interface props {
  transition: any;
}
export const Workspaces: React.FC<props> = ({ transition }) => {
  const auth = useAuth();
  const dispatch = useDispatch()
  const MyworkspaceCode : any = auth?.user?.myWorkspaces && auth?.user?.myWorkspaces[0].code
  const [add, setAdd] = useState(false);
  const [workspaceId, setWorkspaceId] = useState(MyworkspaceCode);


  const joinedWorks = auth?.user?.workspaces?.filter(
    (x: any) => !auth?.user?.myWorkspaces?.find((y: any) => y.name === x)
  );
  const joinedWorksTT = auth?.user?.workspacesTitles?.filter(
    (x: any) => !auth?.user?.myWorkspaces?.find((y: any) => y.title === x)
  );


  useEffect(() => {auth?.refreshInfo()}, [])

    console.log("hola", joinedWorks, joinedWorksTT, auth?.user )
  function handleAdd() {
    setAdd(!add);
  }

  function getId(){
      dispatch(setToast('Copied!'));
      testFunction();
  }

  //console.log("--", auth?.user?.workspaces);
  function refreshWorkspace() {
    auth?.refreshInfo();
  }

  return (
    <>
   
      <AddWorkspace
        dep={add}
        handleAdd={handleAdd}
        refreshWorkspace={refreshWorkspace}
      />

      <MenuToggleContainer transition={transition} k="key3">
        <section className="Workspaces__container">

            <h2
              className={`Workspaces__title ${
                auth?.user?.workspacesTitles?.length || auth?.user?.myWorkspaces?.length ? "display__none" : ""
              }`}
            >
              You do not belong to a workspace yet
            </h2>
            {auth?.user?.myWorkspaces?.length ? (<>
              <h2 className="Workspaces__worksGroup_title">My Workspaces</h2>
              <div className="Workspaces__list">
                {auth.user.myWorkspaces.map((item, i) => {
                  return (
                    <WorkspaceItem
                      key={i}
                      workspace={item.title}
                      path={item.name}
                    />
                  );
                })}
              </div></>
            ) : null}

            {joinedWorksTT?.length ? (
              <div className="Workspaces__list">
                <h2 id="title2" className="Workspaces__worksGroup_title">
                  Joined In
                </h2>
                {joinedWorksTT.map((item, i) => {
                  return (
                    <WorkspaceItem
                      key={i}
                      workspace={item}
                      path={
                          joinedWorks?.length
                            ? joinedWorks[i]
                            : ""
                      }
                      // path={
                      //   auth?.user?.workspaces?.length
                      //     ? auth.user.workspaces[i]
                      //     : ""
                      // }
                    />
                  );
                })}
              </div>
            ) : (
              ""
            )}

            <div className="Workspaces__button_container">
              <button className="Workspaces__button" onClick={handleAdd}>
                Join a Workspace
                <span className="Workspaces__button_icon">
                  <Icon svg="plusCircle" />
                </span>
              </button>
            </div>
            <div className="Workspaces__button_container">
              {<button className="Workspaces__button" onClick={getId}>
                Copy my workspace id
                <span className="Workspaces__button_icon">
                  <Clipboard value={MyworkspaceCode}></Clipboard>
                </span>
              </button>}
            </div>

        
        </section>
      </MenuToggleContainer>
    </>
  );
};
