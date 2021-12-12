import React, { useEffect, useState } from "react";
import { SingleChannel } from "../../components/ChannelComponents/Channels/SingleChannel";
import { ChannelNotFound } from "../../components/ChannelComponents/ChannelNotFound/ChannelNotFound";
import "./Workspaces.scss";
import { useSelector } from "react-redux";
import { ProfileWnd } from "../Logins/Login-Register/ProfileWnd";
import { NavProfileAndLocation } from "../../containers/NavProfileAndLocation/NavProfileAndLocation";
import { Link } from "react-router-dom";
import { AddChannel } from "./AddChannel/AddChannel";
import { Icon } from "../../components/Icon/Icon";
import axios from "axios";
import { URL_BASE } from "../../constants/constants";

import { useAuth } from "../../auth/useAuth";

export const Workspaces: React.FC = () => {
  
  const [add, setAdd] = useState(true);
  const auth = useAuth()
  
  const getWorkspaces = async () => {
    let foundUser = await axios.get(`${URL_BASE}/users`, {params:{email:auth?.user?.email}})
    console.log(foundUser.data)
  }
  getWorkspaces()
  function handleAdd() {
    setAdd(!add);
  }
  function handleFind() {}
  return (
    <>
      <NavProfileAndLocation />
      <AddChannel dep={add} handleAdd={handleAdd} />
      <section className="Workspaces__container">
        <div className="Workspaces__list">
          <h2 className="Workspaces__title">You do not belong to a workspace yet</h2>
          <div className="Workspaces__button_container">
            <button className="Workspaces__button" onClick={handleAdd}>
            Join a Workspace
              <span className="Workspaces__button_icon"><Icon svg="plusCircle" /></span>
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
