import React, { useEffect, useState } from "react";
import { SingleChannel } from "../../components/ChannelComponents/Channels/SingleChannel";
import { ChannelNotFound } from "../../components/ChannelComponents/ChannelNotFound/ChannelNotFound";
import "./Workspaces.scss";
import { useSelector } from "react-redux";
import { ProfileWnd } from "../Logins/Login-Register/ProfileWnd";
import { NavProfileAndLocation } from "../../containers/NavProfileAndLocation/NavProfileAndLocation";
import { Link } from "react-router-dom";
import { AddChannel } from "../../components/ChannelComponents/AddChannel/AddChannel";
import { Icon } from "../../components/Icon/Icon";

export const Workspaces: React.FC = () => {
  // useEffect(()=> {localStorage.setItem('lastRoute', '/home')}, [])

  const [add, setAdd] = useState(false);

  function handleAdd() {
    setAdd(!add)
  }
 function handleFind() {
   
 }
  return (
    <>
      <NavProfileAndLocation />
      <div className="Workspaces__container">

        <div className="Workspaces__button_add">
        Join a Workspace 
        <button className="Workspaces__button_add" onClick={handleAdd} ><Icon svg="plusCircle"/></button>
        </div >
      </div>
       <AddChannel dep={add} handleAdd={handleAdd} />
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
