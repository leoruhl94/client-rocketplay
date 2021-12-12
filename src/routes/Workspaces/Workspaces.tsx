import React, { useEffect, useState } from "react";
import "./Workspaces.scss";
import { useSelector } from "react-redux";
import { ProfileWnd } from "../Logins/Login-Register/ProfileWnd";
import { NavProfileAndLocation } from "../../containers/NavProfileAndLocation/NavProfileAndLocation";
import { Link } from "react-router-dom";
import { AddWorkspace } from "./AddWorkspace/AddWorkspace";
import { Icon } from "../../components/Icon/Icon";
import axios from "axios";
import { URL_BASE } from "../../constants/constants";

import { useAuth } from "../../auth/useAuth";

export const Workspaces: React.FC = () => {
  const [add, setAdd] = useState(false);
  const auth = useAuth();

  function handleAdd() {
    setAdd(!add);
  }
  console.log("--",auth?.user?.workspaces)
  function handleFind() {}
  return (
    <>
      <NavProfileAndLocation />
      <AddWorkspace dep={add} handleAdd={handleAdd} />
      <section className="Workspaces__container">
        <div className="Workspaces__list">
          <h2
            className={`Workspaces__title ${
              auth?.user?.workspaces ? "display__none" : ""
            }`}
          >
            You do not belong to a workspace yet
          </h2>
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
      {/* <ChannelNotFound/> */}
      {/*
      <div className="singleChannelSuperContainer">
        <div className="singleChannel-outer-div">
          <SingleChannel channel="Workspace 1" />
          <SingleChannel channel="Workspace 2" />
          <SingleChannel channel="Workspace 3" />
          <SingleChannel channel="Workspace 4" />
          <div className="channelsAddChannel2">
            <h4>Join a Workspace </h4>
            <button onClick={handleAdd}>+</button>
          </div>
        </div> */}

      {/* </div> */}
    </>
  );
};
